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
from rest_framework import mixins, status
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView

from store import models as innavator_models
from store import permissions as innavator_permissions
from store import serializers as innavator_serializers
from store.snowflake_gen import innavator_slowflake_generator
from store import utils as innavator_utils

@api_view(('GET',))
def who_am_i(request):
    if request.user.is_authenticated:
        return Response({'logged_in': True, 'snowflake_id': innavator_utils.get_innavator_user_from_user(request.user).snowflake_id})
    return Response({'logged_in': False, 'snowflake_id': 0})

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = innavator_serializers.EmailTokenObtainPairSerializer

class InnavatorUserViewset(viewsets.ModelViewSet):
    queryset = innavator_models.InnavatorUser.objects.all()
    serializer_class = innavator_serializers.InnavatorUserSerializer
    permission_classes = (innavator_permissions.UsersPermissions,) # comma is necessary

    @action(detail=True, methods=['get'])
    def get_palette(self, request, pk):
        palette = innavator_models.Palette.objects.get(user=self.get_object())
        serializer = innavator_serializers.PaletteSerializer(palette)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def patch_palette(self, request, pk):
        instance = innavator_models.Palette.objects.get(user=self.get_object())
        serializer = innavator_serializers.PaletteSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def mentors(self, request, pk):
        serializer = innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.filter(
            mentee=self.get_object(),
            mentor_accepted=True,
            mentee_accepted=True
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def mentees(self, request, pk):
        serializer = innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.filter(
            mentor=self.get_object(),
            mentor_accepted=True,
            mentee_accepted=True
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def requests_as_mentor_from_me(self, request, pk):
        serializer = innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.filter(
            mentee=self.get_object(),
            mentor_accepted=False,
            mentee_accepted=True
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def requests_as_mentor_to_me(self, request, pk):
        serializer = innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.filter(
            mentor=self.get_object(),
            mentor_accepted=False,
            mentee_accepted=True
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def requests_as_mentee_from_me(self, request, pk):
        serializer = innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.filter(
            mentor=self.get_object(),
            mentor_accepted=True,
            mentee_accepted=False
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def requests_as_mentee_to_me(self, request, pk):
        serializer = innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.filter(
            mentee=self.get_object(),
            mentor_accepted=True,
            mentee_accepted=False
        ), many=True)
        return Response(serializer.data)

    # creates a request to add the PK as a mentor of the sender
    @action(detail=True, methods=['post'])
    def request_as_mentor(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if sender == receiver:
            # don't accept self-mentorship
            return Response(status=status.HTTP_403_FORBIDDEN)
        new_mentorship_snowflake = innavator_slowflake_generator.__next__()
        receiver.mentees.add(sender, through_defaults={'snowflake_id': new_mentorship_snowflake, 'mentee_accepted': True})
        return Response(innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.get(pk=new_mentorship_snowflake)).data, status=status.HTTP_202_ACCEPTED)

    # creates a request to add the PK as a mentee of the sender
    @action(detail=True, methods=['post'])
    def request_as_mentee(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if sender == receiver:
            # don't accept self-mentorship
            return Response(status=status.HTTP_403_FORBIDDEN)
        new_mentorship_snowflake = innavator_slowflake_generator.__next__()
        sender.mentees.add(receiver, through_defaults={'snowflake_id': new_mentorship_snowflake, 'mentor_accepted': True})
        return Response(innavator_serializers.MentorshipSerializer(innavator_models.Mentorship.objects.get(pk=new_mentorship_snowflake)).data, status=status.HTTP_202_ACCEPTED)

    # accepts the PK's request to be a mentor of the sender
    @action(detail=True, methods=['patch'])
    def accept_mentor_request(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if receiver.mentees.contains(sender):
            mentorship = innavator_models.Mentorship.objects.get(mentor=receiver, mentee=sender)
            if mentorship.mentor_accepted and not mentorship.mentee_accepted:
                mentorship.mentee_accepted = True
                mentorship.save()
                return Response(innavator_serializers.MentorshipSerializer(mentorship).data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # accepts the PK's request to be a mentee of the sender
    @action(detail=True, methods=['patch'])
    def accept_mentee_request(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if sender.mentees.contains(receiver):
            mentorship = innavator_models.Mentorship.objects.get(mentor=sender, mentee=receiver)
            if mentorship.mentee_accepted and not mentorship.mentor_accepted:
                mentorship.mentor_accepted = True
                mentorship.save()
                return Response(innavator_serializers.MentorshipSerializer(mentorship).data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # removes the PK as a mentor of the sender
    @action(detail=True, methods=['delete'])
    def remove_mentor(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if receiver.mentees.contains(sender):
            mentorship = innavator_models.Mentorship.objects.get(mentor=receiver, mentee=sender)
            data = innavator_serializers.MentorshipSerializer(mentorship).data
            receiver.mentees.remove(sender)
            mentorship.delete()
            return Response(data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # removes the PK as a mentee of the sender
    @action(detail=True, methods=['delete'])
    def remove_mentee(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if sender.mentees.contains(receiver):
            mentorship = innavator_models.Mentorship.objects.get(mentor=sender, mentee=receiver)
            data = innavator_serializers.MentorshipSerializer(mentorship).data
            sender.mentees.remove(receiver)
            mentorship.delete()
            return Response(data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['get'])
    def group_requests_from_me(self, request, pk):
        serializer = innavator_serializers.GroupMembershipDetailSerializer(innavator_models.GroupMembership.objects.filter(
            user=self.get_object(),
            user_accepted=True,
            group_accepted=False
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def group_requests_to_me(self, request, pk):
        serializer = innavator_serializers.GroupMembershipDetailSerializer(innavator_models.GroupMembership.objects.filter(
            user=self.get_object(),
            user_accepted=False,
            group_accepted=True
        ), many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        errors = {}

        if user := serializer.validated_data.get('user', None):
            if username := innavator_utils.stripped_if_not_blank(user.get('username', None)):
                if get_user_model().objects.filter(username__exact=username).first():
                    errors.update({'username': ['Username already taken.']})
                else:
                    serializer.validated_data['user']['username'] = username
            else:
                errors.update({'username': ['Username required.']})

            if email := innavator_utils.stripped_if_not_blank(user.get('email', None)):
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
        if full_name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('full_name', None)):
            serializer.validated_data['full_name'] = full_name
        else:
            missing_full_name = True
        if preferred_name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('preferred_name', None)):
            serializer.validated_data['preferred_name'] = preferred_name
        else:
            missing_preferred_name = True
        if missing_full_name and missing_preferred_name:
            errors.update({'full_name': ['Full Name and/or Preferred Name required.'], 'preferred_name': ['Full Name and/or Preferred Name required.']})

        if major := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('major', None)):
            serializer.validated_data['major'] = major
        else:
            errors.update({'major': ['Major required.']})

        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        errors = {}

        missing_full_name = False
        missing_preferred_name = False
        if full_name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('full_name', None)):
            serializer.validated_data['full_name'] = full_name
        else:
            missing_full_name = True
        if preferred_name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('preferred_name', None)):
            serializer.validated_data['preferred_name'] = preferred_name
        else:
            missing_preferred_name = True
        if missing_full_name and missing_preferred_name and not partial:
            errors.update({'full_name': ['Full Name and/or Preferred Name required.'], 'preferred_name': ['Full Name and/or Preferred Name required.']})

        if major := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('major', None)):
            serializer.validated_data['major'] = major
        elif not partial:
            errors.update({'major': ['Major required.']})

        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

class InnavatorGroupViewset(viewsets.ModelViewSet):
    queryset = innavator_models.InnavatorGroup.objects.all()
    serializer_class = innavator_serializers.InnavatorGroupSerializer
    permission_classes = (innavator_permissions.GroupsPermissions,) # comma is necessary

    def list(self, request):
        serializer = self.get_serializer(innavator_models.InnavatorGroup.objects.filter(members=innavator_utils.get_innavator_user_from_user(request.user)), many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def list_all(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def clubs(self, request):
        serializer = innavator_serializers.InnavatorGroupPreviewSerializer(innavator_models.InnavatorGroup.objects.filter(is_club=True), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def members(self, request, pk):
        serializer = innavator_serializers.GroupMembershipSerializer(innavator_models.GroupMembership.objects.filter(
            group=self.get_object(),
            user_accepted=True,
            group_accepted=True
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def requests_from_group(self, request, pk):
        serializer = innavator_serializers.GroupMembershipDetailSerializer(innavator_models.GroupMembership.objects.filter(
            group=self.get_object(),
            user_accepted=False,
            group_accepted=True
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def requests_to_group(self, request, pk):
        serializer = innavator_serializers.GroupMembershipDetailSerializer(innavator_models.GroupMembership.objects.filter(
            group=self.get_object(),
            user_accepted=True,
            group_accepted=False
        ), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def channels(self, request, pk):
        serializer = innavator_serializers.ChannelSerializer(innavator_models.Channel.objects.filter(group=self.get_object()), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def create_channel(self, request, pk):
        group = self.get_object()
        serializer = innavator_serializers.ChannelSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('name', None)):
            if not innavator_models.Channel.objects.filter(name=name, group=group).first():
                channel = innavator_models.Channel(
                    snowflake_id=innavator_slowflake_generator.__next__(),
                    group=group,
                    name=name
                )
                channel.save()
                return_serializer = innavator_serializers.ChannelSerializer(channel)
                return Response(data=return_serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def create_project(self, request, pk):
        group = self.get_object()
        serializer = innavator_serializers.ProjectSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('name', None)):
            if not innavator_models.Project.objects.filter(name=name, group=group).first():
                project = innavator_models.Project(
                    snowflake_id=innavator_slowflake_generator.__next__(),
                    group=group,
                    name=name
                )
                project.save()
                return_serializer = innavator_serializers.ProjectSerializer(project)
                return Response(data=return_serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def invite_to_group(self, request, pk):
        group = self.get_object()
        serializer = innavator_serializers.GroupMembershipDetailSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if receiver := serializer.validated_data.get('receiver', None):
            if not innavator_models.GroupMembership.objects.filter(user=receiver, group=group).first():
                request_message = serializer.validated_data.get('request_message', "")
                is_privileged = serializer.validated_data.get('is_privileged', False)
                new_mentorship_snowflake = innavator_slowflake_generator.__next__()
                group.members.add(receiver, through_defaults={
                    'snowflake_id': new_mentorship_snowflake,
                    'request_message': request_message,
                    'is_privileged': is_privileged,
                    'group_accepted': True
                })
                return_serializer = innavator_serializers.GroupMembershipDetailSerializer(innavator_models.GroupMembership.objects.get(pk=new_mentorship_snowflake))
                return Response(return_serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def request_to_join_group(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        group = self.get_object()
        serializer = innavator_serializers.GroupMembershipDetailSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if not innavator_models.GroupMembership.objects.filter(user=sender, group=group).first():
            request_message = serializer.validated_data.get('request_message', None)
            new_mentorship_snowflake = innavator_slowflake_generator.__next__()
            group.members.add(sender, through_defaults={
                'snowflake_id': new_mentorship_snowflake,
                'request_message': request_message,
                'user_accepted': True
            })
            return_serializer = innavator_serializers.GroupMembershipDetailSerializer(innavator_models.GroupMembership.objects.get(pk=new_mentorship_snowflake))
            return Response(return_serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['patch'])
    def accept_invite(self, request, pk):
        user = innavator_utils.get_innavator_user_from_user(request.user)
        group = self.get_object()

        if group.members.contains(user):
            membership = innavator_models.GroupMembership.objects.get(user=user, group=group)
            if membership.group_accepted and not membership.user_accepted:
                membership.user_accepted = True
                membership.save()
                return Response(innavator_serializers.GroupMembershipDetailSerializer(membership).data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['patch'])
    def accept_group_join_request(self, request, pk):
        serializer = innavator_serializers.GroupMembershipDetailSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if receiver := serializer.validated_data.get('user', None):
            group = self.get_object()
            if group.members.contains(receiver):
                membership = innavator_models.GroupMembership.objects.get(user=receiver, group=group)
                if membership.user_accepted and not membership.group_accepted:
                    membership.group_accepted = True
                    membership.save()
                    return Response(innavator_serializers.GroupMembershipDetailSerializer(membership).data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # this also rejects a request to join
    @action(detail=True, methods=['post'])
    def remove_user(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        group = self.get_object()
        serializer = innavator_serializers.GroupMembershipDetailSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if user := serializer.validated_data.get('user', None):
            # you may not throw out the owner
            if group.owner != user:
                if group.members.contains(user):
                    membership = innavator_models.GroupMembership.objects.get(user=user, group=group)
                    # privileged non-owner users may not cat-fight
                    if group.owner == sender or not membership.is_privileged:
                        data = innavator_serializers.GroupMembershipDetailSerializer(membership).data
                        group.members.remove(user)
                        membership.delete()
                        return Response(data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # this also rejects an invite
    @action(detail=True, methods=['delete'])
    def leave(self, request, pk):
        user = innavator_utils.get_innavator_user_from_user(request.user)
        group = self.get_object()

        # don't let the owner leave without passing the buck
        if group.owner != user:
            if group.members.contains(user):
                membership = innavator_models.GroupMembership.objects.get(user=user, group=group)
                data = innavator_serializers.GroupMembershipDetailSerializer(membership).data
                group.members.remove(user)
                membership.delete()
                return Response(data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def create(self, request):
        serializer = self.get_serializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('name', None)):
            serializer.validated_data['name'] = name
        else:
            return Response({'name': ['Name required.']}, status=status.HTTP_400_BAD_REQUEST)
        group = serializer.save(snowflake_id=innavator_slowflake_generator.__next__(), owner=innavator_utils.get_innavator_user_from_user(request.user))
        innavator_user = innavator_utils.get_innavator_user_from_user(request.user)
        new_group_membership_snowflake = innavator_slowflake_generator.__next__()
        group.members.add(innavator_user, through_defaults={
            'snowflake_id': new_group_membership_snowflake,
            'is_privileged': True,
            'user_accepted': True,
            'group_accepted': True
        })
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ChannelViewset(mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = innavator_models.Channel.objects.all()
    serializer_class = innavator_serializers.ChannelSerializer
    permission_classes = (innavator_permissions.ChannelsPermissions,) # comma is necessary

    @action(detail=True, methods=['get'])
    def messages(self, request, pk):
        channel = self.get_object()
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        innavator_utils.update_last_read_message(channel, sender)

        serializer = innavator_serializers.MessageSerializer(innavator_models.Message.objects.filter(channel=channel).order_by('-snowflake_id'), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def unread_message_count(self, request, pk):
        channel = self.get_object()
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        count = 0
        if channel.last_read_list.contains(sender):
            count = innavator_models.Message.objects.filter(channel=channel, snowflake_id__gt=innavator_models.LastRead.objects.get(channel=channel, user=sender).last_read).count()
        else:
            count = innavator_models.Message.objects.filter(channel=channel).count()
        return Response({'count': count})

    @action(detail=True, methods=['post'])
    def create_message(self, request, pk):
        channel = self.get_object()
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        serializer = innavator_serializers.MessageSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if contents := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('contents', None)):
            message = innavator_models.Message(
                snowflake_id=innavator_slowflake_generator.__next__(),
                channel=channel,
                sender=sender,
                contents=contents
            )
            message.save()
            return_serializer = innavator_serializers.MessageSerializer(message)
            innavator_utils.update_last_read_message(channel, sender)
            return Response(data=return_serializer.data, status=status.HTTP_201_CREATED)

class MessageViewset(mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = innavator_models.Message.objects.all()
    serializer_class = innavator_serializers.MessageSerializer
    permission_classes = (innavator_permissions.MessagesPermissions,) # comma is necessary

class RoleViewset(viewsets.ReadOnlyModelViewSet):
    queryset = innavator_models.Role.objects.all()
    serializer_class = innavator_serializers.RoleSerializer
    permission_classes = (innavator_permissions.RolesPermissions,) # comma is necessary

class ProjectViewset(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = innavator_models.Project.objects.all()
    serializer_class = innavator_serializers.ProjectSerializer
    permission_classes = (innavator_permissions.ProjectsPermissions,) # comma is necessary
