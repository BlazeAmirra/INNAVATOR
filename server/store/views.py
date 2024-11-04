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
from django.http import Http404
#from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView

from store.models import InnavatorUser, Mentorship, Palette
from store.permissions import PalettesPermissions, UsersPermissions
from store.serializers import EmailTokenObtainPairSerializer, InnavatorUserSerializer, MentorshipSerializer, PaletteSerializer
from store.snowflake_gen import innavator_slowflake_generator

def stripped_if_not_blank(object):
    if object:
        if (stripped_object := object.strip()) != '':
            return stripped_object
    return None

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

#@api_view(('GET',))
#def email_to_user(request, b64):
#    if user := InnavatorUser.objects.filter(user__email__exact=bytes.decode(urlsafe_base64_decode(b64))).first():
#        return Response({'snowflake_id': user.snowflake_id}, status=status.HTTP_200_OK)
#    return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(('GET',))
def who_am_i(request):
    if request.user.is_authenticated:
        if user := InnavatorUser.objects.filter(user__id=request.user.id).first():
            return Response({'logged_in': True, 'snowflake_id': user.snowflake_id}, status=status.HTTP_200_OK)
        return Response({'logged_in': False, 'snowflake_id': 0}, status=status.HTTP_404_NOT_FOUND) # should never happen
    return Response({'logged_in': False, 'snowflake_id': 0}, status=status.HTTP_200_OK)

class InnavatorUserViewset(viewsets.ModelViewSet):
    queryset = InnavatorUser.objects.all()
    serializer_class = InnavatorUserSerializer
    permission_classes = (UsersPermissions,) # comma is necessary

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
    queryset = Palette.objects.all()
    serializer_class = PaletteSerializer
    permission_classes = (PalettesPermissions,)

    def create(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class MentorListView(APIView):
    def get_innavator_user(self, pk):
        try:
            return InnavatorUser.objects.get(pk=pk)
        except InnavatorUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_innavator_user(pk)
        serializer = MentorshipSerializer(Mentorship.objects.filter(mentee=user.pk), many=True)
        return Response(serializer.data)

    # adds the PK as a mentor of the sender
    # TODO: turn into a request system which can be refused
    def post(self, request, pk, format=None):
        if request.user.is_authenticated:
            if sender := InnavatorUser.objects.filter(user__id=request.user.id).first():
                if sender.snowflake_id == pk:
                    # don't accept self-mentorship
                    return Response(status=status.HTTP_403_FORBIDDEN)
                receiver = self.get_innavator_user(pk)
                new_mentorship_snowflake = innavator_slowflake_generator.__next__()
                receiver.mentors.add(sender, through_defaults={'snowflake_id': new_mentorship_snowflake})
                return Response(MentorshipSerializer(Mentorship.objects.get(pk=new_mentorship_snowflake)).data, status=status.HTTP_202_ACCEPTED)
            return Response(status=status.HTTP_404_NOT_FOUND) # should never happen
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, format=None):
        if request.user.is_authenticated:
            if sender := InnavatorUser.objects.filter(user__id=request.user.id).first():
                receiver = self.get_innavator_user(pk)
                if receiver.mentors.contains(sender):
                    mentorship = Mentorship.objects.get(mentor=receiver, mentee=sender)
                    data = MentorshipSerializer(mentorship).data
                    receiver.mentors.remove(sender)
                    mentorship.delete()
                    return Response(data, status=status.HTTP_202_ACCEPTED)
                return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            return Response(status=status.HTTP_404_NOT_FOUND) # should never happen
        return Response(status=status.HTTP_401_UNAUTHORIZED)

class MenteeListView(APIView):
    def get_innavator_user(self, pk):
        try:
            return InnavatorUser.objects.get(pk=pk)
        except InnavatorUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_innavator_user(pk)
        serializer = MentorshipSerializer(Mentorship.objects.filter(mentor=user.pk), many=True)
        return Response(serializer.data)

    # adds the sender as a mentor of the PK
    # TODO: turn into a request system which can be refused
    def post(self, request, pk, format=None):
        if request.user.is_authenticated:
            if sender := InnavatorUser.objects.filter(user__id=request.user.id).first():
                if sender.snowflake_id == pk:
                    # don't accept self-mentorship
                    return Response(status=status.HTTP_403_FORBIDDEN)
                receiver = self.get_innavator_user(pk)
                new_mentorship_snowflake = innavator_slowflake_generator.__next__()
                sender.mentors.add(receiver, through_defaults={'snowflake_id': new_mentorship_snowflake})
                return Response(MentorshipSerializer(Mentorship.objects.get(pk=new_mentorship_snowflake)).data, status=status.HTTP_202_ACCEPTED)
            return Response(status=status.HTTP_404_NOT_FOUND) # should never happen
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, format=None):
        if request.user.is_authenticated:
            if sender := InnavatorUser.objects.filter(user__id=request.user.id).first():
                receiver = self.get_innavator_user(pk)
                if sender.mentors.contains(receiver):
                    mentorship = Mentorship.objects.get(mentor=sender, mentee=receiver)
                    data = MentorshipSerializer(mentorship).data
                    sender.mentors.remove(receiver)
                    mentorship.delete()
                    return Response(data, status=status.HTTP_202_ACCEPTED)
                return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            return Response(status=status.HTTP_404_NOT_FOUND) # should never happen
        return Response(status=status.HTTP_401_UNAUTHORIZED)
