#!/usr/bin/python
#
# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from django.views.decorators.http import require_http_methods
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from store.models import Product, SiteConfig, Testimonial, Transaction
from store.serializers import (
    ProductSerializer,
    SiteConfigSerializer,
    TestimonialSerializer,
    CartSerializer,
    CheckoutSerializer,
)


class ProductPurchaseException(APIException):
    status_code = 405
    default_detail = {
        "code": status_code,
        "message": "Unable to complete purchase - no inventory",
    }


def log_error(error_name, error_message, product):
    # Log error by writing structured JSON. Can be then used with log-based alerting, metrics, etc.
    print(
        json.dumps(
            {
                "severity": "ERROR",
                "error": error_name,
                "message": f"{error_name}: {error_message}",
                "method": "ProductViewSet.purchase()",
                "product": product.id,
                "countRequested": 1,
                "countFulfilled": product.inventory_count,
            }
        )
    )


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    class ProductPurchaseException(APIException):
        status_code = 405
        default_detail = {
            "code": status_code,
            "message": "Unable to complete purchase - no inventory",
        }

    @action(detail=True, methods=["get", "post"])
    def purchase(self, request, pk):
        product = get_object_or_404(Product, id=pk)
        if product.inventory_count > 0:
            product.inventory_count -= 1
            product.save()
            Transaction.objects.create(
                datetime=timezone.now(), product_id=product, unit_price=product.price
            )
        else:
            log_error(
                "INVENTORY_COUNT_ERROR",
                "A purchase was attempted where there was insufficient inventory to fulfil the order.",
                product,
            )
            raise ProductPurchaseException()

        # If the transaction caused a product to sell out, log an error
        if product.inventory_count == 0:
            log_error(
                "INVENTORY_SOLDOUT_ERROR",
                "A purchase just caused a product to sell out. More inventory will be required.",
                product,
            )

        serializer = ProductSerializer(product)
        return Response(serializer.data)


class ActiveProductViewSet(viewsets.ViewSet):
    @extend_schema(request=None, responses=ProductSerializer)
    def list(self, request, formatting=None):
        active_product = get_object_or_404(Product, active=True)
        serializer = ProductSerializer(active_product, context={"request": request})
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.order_by("-rating").all()
    serializer_class = TestimonialSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["product_id"]


class SiteConfigViewSet(viewsets.ModelViewSet):
    queryset = SiteConfig.objects.all()
    serializer_class = SiteConfigSerializer


class ActiveSiteConfigViewSet(viewsets.ViewSet):
    @extend_schema(responses=SiteConfigSerializer)
    def list(self, request, formatting=None):
        active = get_object_or_404(SiteConfig, active=True)
        serializer = SiteConfigSerializer(active)
        return Response(serializer.data)


@ensure_csrf_cookie
@require_http_methods(["POST"])
def checkout(request):
    def lift_item_status(data):
        status = ""
        for item in data["items"]:
            if "status" in item:
                for i in item["status"]:
                    status = str(i)

        return status

    serializer = CartSerializer(data=json.loads(request.body))

    if not serializer.is_valid():
        status_code = 400
        status = "validation_error"
        if "payment" in serializer.errors:
            status_code = 501
            status = serializer.errors["payment"]["method"][0].code
        if "items" in serializer.errors:
            status = lift_item_status(serializer.errors)
        return JsonResponse(
            {"status": status, "errors": serializer.errors}, status=status_code
        )

    cart = serializer.validated_data

    items = []
    for item in cart["items"]:
        product = get_object_or_404(Product, id=item["id"])
        count = item["countRequested"]

        product.inventory_count -= count
        product.save()
        for _ in range(count):
            Transaction.objects.create(
                datetime=timezone.now(), product_id=product, unit_price=product.price
            )
        items.append(
            {"id": product.id, "countRequested": count, "countFulfilled": count}
        )

        if product.inventory_count == 0:
            log_error(
                "INVENTORY_SOLDOUT_ERROR",
                "A purchase just caused a product to sell out. More inventory will be required.",
                product,
            )

    response = CheckoutSerializer(data={"status": "complete", "items": items})
    response.is_valid()
    return JsonResponse(response.data)


def csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})

# end Google code
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView

from store import models as innavator_models
from store import permissions as innavator_permissions
from store import serializers as innavator_serializers
from store.snowflake_gen import innavator_slowflake_generator
from store import utils as innavator_utils

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = innavator_serializers.EmailTokenObtainPairSerializer

@api_view(('GET',))
def who_am_i(request):
    if request.user.is_authenticated:
        return Response({'logged_in': True, 'snowflake_id': innavator_utils.get_innavator_user_from_user(request.user).snowflake_id})
    return Response({'logged_in': False, 'snowflake_id': 0})

class InnavatorUserViewset(viewsets.ModelViewSet):
    queryset = innavator_models.InnavatorUser.objects.all()
    serializer_class = innavator_serializers.InnavatorUserSerializer
    permission_classes = (innavator_permissions.UsersPermissions,) # comma is necessary

    def create(self, request):
        serializer = self.get_serializer(data=request.data, partial=True)
        errors = {}
        if serializer.is_valid():
            if user := serializer.validated_data.get('user', None):
                if username := stripped_if_not_blank(user.get('username', None)):
                    if get_user_model().objects.filter(username__exact=username).first():
                        errors.update({'username': ['Username already taken.']})
                    else:
                        serializer.validated_data['user']['username'] = username
                else:
                    errors.update({'username': ['Username required.']})

                if email := stripped_if_not_blank(user.get('email', None)):
                    if get_user_model().objects.filter(email__exact=email).first():
                        errors.update({'email': ['Email address already used.']})
                    else:
                        serializer.validated_data['user']['email'] = email
                else:
                    errors.update({'email': ['Email address required.']})

                if not user.get('password', None):
                    errors.update({'password': ['Password required.']})
            else:
                errors.update({'user': ['User object missing.']})

            missing_full_name = False
            missing_preferred_name = False
            if full_name := stripped_if_not_blank(serializer.validated_data.get('full_name', None)):
                serializer.validated_data['full_name'] = full_name
            else:
                missing_full_name = True
            if preferred_name := stripped_if_not_blank(serializer.validated_data.get('preferred_name', None)):
                serializer.validated_data['preferred_name'] = preferred_name
            else:
                missing_preferred_name = True
            if missing_full_name and missing_preferred_name:
                errors.update({'full_name': ['Full Name and/or Preferred Name required.'], 'preferred_name': ['Full Name and/or Preferred Name required.']})

            if major := stripped_if_not_blank(serializer.validated_data.get('major', None)):
                serializer.validated_data['major'] = major
            else:
                errors.update({'major': ['Major required.']})

            if errors:
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=self.get_success_headers(serializer.data))
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        errors = {}

        if serializer.is_valid():
            missing_full_name = False
            missing_preferred_name = False
            if full_name := stripped_if_not_blank(serializer.validated_data.get('full_name', None)):
                serializer.validated_data['full_name'] = full_name
            else:
                missing_full_name = True
            if preferred_name := stripped_if_not_blank(serializer.validated_data.get('preferred_name', None)):
                serializer.validated_data['preferred_name'] = preferred_name
            else:
                missing_preferred_name = True
            if missing_full_name and missing_preferred_name and not partial:
                errors.update({'full_name': ['Full Name and/or Preferred Name required.'], 'preferred_name': ['Full Name and/or Preferred Name required.']})

            if major := stripped_if_not_blank(serializer.validated_data.get('major', None)):
                serializer.validated_data['major'] = major
            elif not partial:
                errors.update({'major': ['Major required.']})

            if errors:
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                self.perform_update(serializer)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaletteViewset(viewsets.ModelViewSet):
    queryset = innavator_models.Palette.objects.all()
    serializer_class = innavator_serializers.PaletteSerializer
    permission_classes = (innavator_permissions.PalettesPermissions,)

    def create(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class MentorListView(APIView):
    def get(self, request, pk, format=None):
        user = innavator_utils.get_innavator_user(pk)
        serializer = innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.filter(mentee=user.pk), many=True)
        return Response(serializer.data)

    # creates a request to add the PK as a mentor of the sender
    def post(self, request, pk, format=None):
        if request.user.is_authenticated:
            sender = innavator_utils.get_innavator_user_from_user(request.user)
            if sender.snowflake_id == pk:
                # don't accept self-mentorship
                return Response(status=status.HTTP_403_FORBIDDEN)
            receiver = innavator_utils.get_innavator_user(pk)
            new_mentorship_snowflake = innavator_slowflake_generator.__next__()
            receiver.mentees.add(sender, through_defaults={'snowflake_id': new_mentorship_snowflake, 'mentee_accepted': True})
            return Response(innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.get(pk=new_mentorship_snowflake)).data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    # accepts the PK's request to be a mentor of the sender
    def patch(self, request, pk, format=None):
        if request.user.is_authenticated:
            sender = innavator_utils.get_innavator_user_from_user(request.user)
            receiver = innavator_utils.get_innavator_user(pk)
            if receiver.mentees.contains(sender):
                mentorship = innavator_models.Mentorship.objects.get(mentor=receiver, mentee=sender)
                if mentorship.mentor_accepted and not mentorship.mentee_accepted:
                    mentorship.mentee_accepted = True
                    mentorship.save()
                    return Response(innavator_serializers.MentorshipSerializer(mentorship).data, status=status.HTTP_202_ACCEPTED)
                return Response(status=status.HTTP_403_FORBIDDEN)
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    # removes the PK as a mentor of the sender
    def delete(self, request, pk, format=None):
        if request.user.is_authenticated:
            sender = innavator_utils.get_innavator_user_from_user(request.user)
            receiver = innavator_utils.get_innavator_user(pk)
            if receiver.mentees.contains(sender):
                mentorship = innavator_models.Mentorship.objects.get(mentor=receiver, mentee=sender)
                data = innavator_serializers.MentorshipSerializer(mentorship).data
                receiver.mentees.remove(sender)
                mentorship.delete()
                return Response(data, status=status.HTTP_202_ACCEPTED)
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

class MenteeListView(APIView):
    def get(self, request, pk, format=None):
        user = innavator_utils.get_innavator_user(pk)
        serializer = innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.filter(mentor=user.pk), many=True)
        return Response(serializer.data)

    # creates a request to add the PK as a mentee of the sender
    def post(self, request, pk, format=None):
        if request.user.is_authenticated:
            sender = innavator_utils.get_innavator_user_from_user(request.user)
            if sender.snowflake_id == pk:
                # don't accept self-mentorship
                return Response(status=status.HTTP_403_FORBIDDEN)
            receiver = innavator_utils.get_innavator_user(pk)
            new_mentorship_snowflake = innavator_slowflake_generator.__next__()
            sender.mentees.add(receiver, through_defaults={'snowflake_id': new_mentorship_snowflake, 'mentor_accepted': True})
            return Response(innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.get(pk=new_mentorship_snowflake)).data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    # accepts the PK's request to be a mentee of the sender
    def patch(self, request, pk, format=None):
        if request.user.is_authenticated:
            sender = innavator_utils.get_innavator_user_from_user(request.user)
            receiver = innavator_utils.get_innavator_user(pk)
            if sender.mentees.contains(receiver):
                mentorship = innavator_models.Mentorship.objects.get(mentor=sender, mentee=receiver)
                if mentorship.mentee_accepted and not mentorship.mentor_accepted:
                    mentorship.mentor_accepted = True
                    mentorship.save()
                    return Response(innavator_serializers.MentorshipSerializer(mentorship).data, status=status.HTTP_202_ACCEPTED)
                return Response(status=status.HTTP_403_FORBIDDEN)
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    # removes the PK as a mentee of the sender
    def delete(self, request, pk, format=None):
        if request.user.is_authenticated:
            sender = innavator_utils.get_innavator_user_from_user(request.user)
            receiver = innavator_utils.get_innavator_user(pk)
            if sender.mentees.contains(receiver):
                mentorship = innavator_models.Mentorship.objects.get(mentor=sender, mentee=receiver)
                data = innavator_serializers.MentorshipSerializer(mentorship).data
                sender.mentees.remove(receiver)
                mentorship.delete()
                return Response(data, status=status.HTTP_202_ACCEPTED)
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(('GET',))
def club_list(request):
    serializer = innavator_serializers.InnavatorGroupPreviewSerializer(innavator_models.InnavatorGroup.objects.filter(is_club=True), many=True)
    return Response(serializer.data)

class InnavatorGroupViewset(viewsets.ModelViewSet):
    queryset = innavator_models.InnavatorGroup.objects.all()
    serializer_class = innavator_serializers.InnavatorGroupSerializer
    permission_classes = (innavator_permissions.GroupsPermissions,) # comma is necessary

    def list(self, request):
        if request.user.is_authenticated:
            serializer = self.get_serializer(innavator_models.InnavatorGroup.objects.filter(members=innavator_utils.get_innavator_user_from_user(request.user)), many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['get'])
    def list_requests_from_me(self, request):
        serializer = innavator_serializers.GroupMembershipDetailSerializer(innavator_models.GroupMembership.objects.filter(
            user=innavator_utils.get_innavator_user_from_user(request.user),
            user_accepted=True,
            group_accepted=False
        ), many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def list_requests_to_me(self, request):
        serializer = innavator_serializers.GroupMembershipDetailSerializer(innavator_models.GroupMembership.objects.filter(
            user=innavator_utils.get_innavator_user_from_user(request.user),
            user_accepted=False,
            group_accepted=True
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def list_requests_from_group(self, request, pk=None):
        serializer = innavator_serializers.GroupMembershipDetailSerializer(innavator_models.GroupMembership.objects.filter(
            group=self.get_object(),
            user_accepted=False,
            group_accepted=True
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def list_requests_to_group(self, request, pk=None):
        serializer = innavator_serializers.GroupMembershipDetailSerializer(innavator_models.GroupMembership.objects.filter(
            group=self.get_object(),
            user_accepted=True,
            group_accepted=False
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def members(self, request, pk):
        innavator_group = self.get_object()
        serializer = innavator_serializers.GroupMembershipSerializer(innavator_models.GroupMembership.objects.filter(group=innavator_group, user_accepted=True, group_accepted=True), many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data, partial=True)
        if serializer.is_valid():
            if name := stripped_if_not_blank(serializer.validated_data.get('name', None)):
                serializer.validated_data['name'] = name
            else:
                return Response({'name': ['Name required.']}, status=status.HTTP_400_BAD_REQUEST)
            group = serializer.save(snowflake_id=innavator_slowflake_generator.__next__(), owner=get_innavator_user_from_user(request.user))
            innavator_user = get_innavator_user_from_user(request.user)
            new_mentorship_snowflake = innavator_slowflake_generator.__next__()
            group.members.add(innavator_user, through_defaults={
                'snowflake_id': new_mentorship_snowflake,
                'is_privileged': True,
                'user_accepted': True,
                'group_accepted': True
            })
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=self.get_success_headers(serializer.data))
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
