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

from rest_framework import serializers
from store.models import Product, SiteConfig, Testimonial


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "discount_price",
            "active",
            "discount_percent",
            "discount_saving",
            "inventory_count",
            "image",
            "product_we_love",
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            "id",
            "product_id",
            "reviewer_name",
            "reviewer_location",
            "rating",
            "summary",
            "description",
        ]


class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = [
            "active",
            "color_primary",
            "color_secondary",
            "color_action",
            "color_action_text",
            "site_name",
            "site_name_font",
            "site_name_color",
            "base_font",
        ]


class CartPaymentSerializer(serializers.Serializer):
    method = serializers.ChoiceField(choices=["collect"])


class CartCustomerSerializer(serializers.Serializer):
    email = serializers.EmailField()


class CartItemSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    countRequested = serializers.IntegerField(required=True)
    countFulfilled = serializers.IntegerField(required=False)

    def validate(self, data):
        try:
            product = Product.objects.get(pk=data["id"])
        except Product.DoesNotExist:
            raise serializers.ValidationError(detail={"status": "product_not_found"})

        requested = data["countRequested"]
        if product.inventory_count < requested:
            data["countFulfilled"] = product.inventory_count

            # Log error by writing structured JSON. Can be then used with log-based alerting, metrics, etc.
            error_name = "INSUFFICIENT_PRODUCT_ERROR"
            print(
                json.dumps(
                    {
                        "severity": "ERROR",
                        "error": error_name,
                        "message": f"{error_name}: A purchase was attempted where there was insufficient inventory to fulfil the order.",
                        "product": product.id,
                        "method": "CartItemSerializer.validate()",
                        "countRequested": data["countRequested"],
                        "countFulfilled": data["countFulfilled"],
                    }
                )
            )

            raise serializers.ValidationError(
                detail={"status": "insufficient_product", "items": data}
            )
        else:
            data["countFulfilled"] = requested
        return data


class CartSerializer(serializers.Serializer):
    customer = CartCustomerSerializer(required=True)
    payment = CartPaymentSerializer(required=True)
    items = CartItemSerializer(many=True)


class CheckoutSerializer(serializers.Serializer):
    items = CartItemSerializer(many=True)
    status = serializers.CharField()

# end Google code

from django.contrib.auth import get_user_model
from django.utils import timezone
from django.utils.html import escape
from rest_framework import exceptions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from store import models as innavator_models
from store.snowflake_gen import innavator_slowflake_generator

# https://stackoverflow.com/a/75452395
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        users = get_user_model().objects.filter(email=attrs["username"])
        if (users.exists()):
            attrs["username"] = users.first().username
        else:
            raise exceptions.AuthenticationFailed(
                self.error_messages["no_active_account"],
                "no_active_account",
            )
        return super().validate(attrs)

class _DjangoUserSerializer(serializers.ModelSerializer):
    """
    Serializer for Django's internal user details.
    DO NOT USE OUTSIDE OF `InnavatorUserSerializer`
    """
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class InnavatorUserSerializer(serializers.ModelSerializer):
    user = _DjangoUserSerializer()

    class Meta:
        model = innavator_models.InnavatorUser
        exclude = ['mentees', 'willing_to_tutor']
        extra_kwargs = {'user': {'required': False, 'allow_null': True}}

# apparently this sanitization isn't needed

#    def validate_user(self, value):
#        value['email'] = escape(value['email'])
#        return value

#    def validate_full_name(self, value):
#        return escape(value)
#    def validate_preferred_name(self, value):
#        return escape(value)
#    def validate_major(self, value):
#        return escape(value)
#    def validate_website_url(self, value):
#        return escape(value)
#    def validate_profile_picture_url(self, value):
#        return escape(value)

    def create(self, validated_data):
        user = innavator_models.InnavatorUser.objects.create(
            username = validated_data['user']['username'],
            email = validated_data['user']['email'],
            password = validated_data['user']['password']
        )
        user.major = validated_data['major']
        if full_name := validated_data.get('full_name', None):
            user.full_name = full_name
        if preferred_name := validated_data.get('preferred_name', None):
            user.preferred_name = preferred_name
        if website_url := validated_data.get('website_url', None):
            user.website_url = website_url
        if profile_picture_url := validated_data.get('profile_picture_url', None):
            user.profile_picture_url = profile_picture_url
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.preferred_name = validated_data.get('preferred_name', instance.preferred_name)
        instance.major = validated_data.get('major', instance.major)
        instance.website_url = validated_data.get('website_url', instance.website_url)
        instance.profile_picture_url = validated_data.get('profile_picture_url', instance.profile_picture_url)
        instance.save()
        return instance

class PaletteSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.Palette
        fields = '__all__'

class MentorshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.Mentorship
        fields = '__all__'

#    def validate_request_message(self, value):
#        return escape(value)

class InnavatorGroupPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.InnavatorGroup
        fields = ['snowflake_id', 'name']

#    def validate_name(self, value):
#        return escape(value)

class InnavatorGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.InnavatorGroup
        exclude = ['members']

#    def validate_name(self, value):
#        return escape(value)

    def update(self, instance, validated_data):
        validated_data.pop("is_club", False)
        return super().update(instance, validated_data)

class GroupMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.GroupMembership
        fields = ['user', 'is_privileged']

class GroupMembershipDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.GroupMembership
        fields = '__all__'

#    def validate_request_message(self, value):
#        return escape(value)

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.Channel
        exclude = ['last_read_list']
        extra_kwargs = {'group': {'read_only': True}}

#    def validate_name(self, value):
#        return escape(value)

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.Message
        fields = '__all__'
        extra_kwargs = {'channel': {'read_only': True}, 'sender': {'read_only': True}}

#    def validate_contents(self, value):
#        return escape(value)

    def update(self, instance, validated_data):
        instance.contents = validated_data.get('contents', instance.contents)
        instance.is_edited = True
        instance.last_revision = timezone.now()
        instance.save()
        return instance

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.Role
        fields = '__all__'

    # this is rather paranoid given that these are only admin-set
#    def validate_name(self, value):
#        return escape(value)

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.Project
        exclude = ['group', 'members']
        extra_kwargs = {'looking_for_roles': {'read_only': True}}

#    def validate_name(self, value):
#        return escape(value)
#    def validate_description(self, value):
#        return escape(value)

class ProjectRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.ProjectRole
        fields = '__all__'

class ProjectRoleNeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.ProjectRoleNeed
        fields = '__all__'

class CommissionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.CommissionRequest
        fields = '__all__'
        extra_kwargs = {'sender': {'read_only': True}}

#    def validate_name(self, value):
#        return escape(value)
#    def validate_description(self, value):
#        return escape(value)

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.Event
        fields = '__all__'
        extra_kwargs = {'group': {'read_only': True}}

#    def validate_name(self, value):
#        return escape(value)
#    def validate_description(self, value):
#        return escape(value)

class PortfolioEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.PortfolioEntry
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}

#    def validate_name(self, value):
#        return escape(value)
#    def validate_description(self, value):
#        return escape(value)

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.Subject
        fields = '__all__'

    # this is rather paranoid given that these are only admin-set
#    def validate_name(self, value):
#        return escape(value)

class WillingnessToTutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = innavator_models.WillingnessToTutor
        fields = '__all__'
