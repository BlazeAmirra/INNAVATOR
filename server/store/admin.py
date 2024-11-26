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


#from django.contrib import admin
#from django.utils.html import format_html
#
#from store.models import Product, SiteConfig, Testimonial, Transaction
#
#
#@admin.register(Product)
#class ProductAdmin(admin.ModelAdmin):
#    list_display = (
#        "name",
#        "description",
#        "price",
#        "discount",
#        "inventory_count",
#        "active",
#        "product_we_love",
#    )
#
#    # Display preview of image in admin
#    @admin.display(description="Product Image Preview")
#    def image_tag(self, obj):
#        return format_html('<img src="{}" style="width: 200px"/>'.format(obj.image.url))
#
#    readonly_fields = ["image_tag"]
#
#    # Formatted discount display for admin list
#    def discount(self, obj):
#        return f"{obj.discount_percent}%"
#
#
#@admin.register(Transaction)
#class TransactionAdmin(admin.ModelAdmin):
#    list_display = ("datetime", "product_id")
#
#
#@admin.register(Testimonial)
#class TransactionAdmin(admin.ModelAdmin):
#    list_display = (
#        "product_id",
#        "reviewer_name",
#        "reviewer_location",
#        "rating",
#        "summary",
#    )
#
#
#@admin.register(SiteConfig)
#class SiteConfigAdmin(admin.ModelAdmin):
#    list_display = ("site_name", "active")
#    fieldsets = (
#        (None, {"fields": ("active", "base_font")}),
#        ("Site Header", {"fields": ("site_name", "site_name_color", "site_name_font")}),
#        (
#            "Colors",
#            {
#                "fields": (
#                    "color_primary",
#                    "color_secondary",
#                    "color_action",
#                    "color_action_text",
#                )
#            },
#        ),
#    )
#
# end Google code
from django.contrib import admin

from store import models as innavator_models
from store.snowflake_gen import innavator_slowflake_generator

@admin.register(innavator_models.InnavatorUser)
class InnavatorUserAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "my_email", "full_name", "preferred_name")
    readonly_fields = ["snowflake_id", "user"]

    # disallow InnavatorUser without Palette
    def has_add_permission(self, request):
        return False
    # disallow User without InnavatorUser
    def has_delete_permission(self, request, obj=None):
        return False

    # Display "Email" for the column header instead of "User Email"
    @admin.display(description="Email")
    def my_email(self, obj):
        return obj.user.email

@admin.register(innavator_models.Palette)
class PaletteAdmin(admin.ModelAdmin):
    list_display = ("user__snowflake_id", "my_user_email", "user__full_name", "user__preferred_name")
    readonly_fields = ["user"]

    # disallow Palette without InnavatorUser
    def has_add_permission(self, request):
        return False
    # disallow InnavatorUser without Palette
    def has_delete_permission(self, request, obj=None):
        return False

    # Display "User Email" for the column header instead of "User User Email"
    @admin.display(description="User Email")
    def my_user_email(self, obj):
        return obj.user.user.email

@admin.register(innavator_models.Mentorship)
class MentorshipAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "mentor", "mentee")
    readonly_fields = ["snowflake_id"]

    # adding a mentorship this way makes no sense
    def has_add_permission(self, request):
        return False
    # changing a mentorship this way makes no sense
    def has_change_permission(self, request, obj=None):
        return False

@admin.register(innavator_models.InnavatorGroup)
class InnavatorGroup(admin.ModelAdmin):
    list_display = ("snowflake_id", "name", "owner")
    readonly_fields = ["snowflake_id"]

    # adding a group this way makes no sense
    def has_add_permission(self, request):
        return False

@admin.register(innavator_models.GroupMembership)
class GroupMembershipAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "group", "user")
    readonly_fields = ["snowflake_id"]

    # adding a group membership this way makes no sense
    def has_add_permission(self, request):
        return False
    # putting words in other peoples' mouths
    def has_change_permission(self, request, obj=None):
        return False

@admin.register(innavator_models.Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "group", "name")
    readonly_fields = ["snowflake_id", "group"]

    # adding a channel this way makes no sense
    def has_add_permission(self, request):
        return False

@admin.register(innavator_models.Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "sender", "channel", "last_revision")
    readonly_fields = ["snowflake_id"]

    # adding a message this way makes no sense
    def has_add_permission(self, request):
        return False
    # we DO NOT put words in other peoples' mouths
    def has_change_permission(self, request, obj=None):
        return False

@admin.register(innavator_models.LastRead)
class LastReadAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "channel", "user", "last_read")
    readonly_fields = ["snowflake_id"]

    # doesn't really make sense to add this
    def has_add_permission(self, request):
        return False
    # doesn't really make sense to remove this
    def has_delete_permission(self, request, obj=None):
        return False
    # doesn't really make sense to change this
    def has_change_permission(self, request, obj=None):
        return False

@admin.register(innavator_models.Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "name")
    readonly_fields = ["snowflake_id"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.snowflake_id = innavator_slowflake_generator.__next__()
        return super().save_model(request, obj, form, change)

@admin.register(innavator_models.Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "group", "name", "is_active")
    readonly_fields = ["snowflake_id"]

    # adding a project this way makes no sense
    def has_add_permission(self, request):
        return False

@admin.register(innavator_models.ProjectRoleNeed)
class ProjectRoleNeedAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "project", "role")
    readonly_fields = ["snowflake_id"]

    # adding a role need this way makes no sense
    def has_add_permission(self, request):
        return False
    # changing a role need this way makes no sense
    def has_change_permission(self, request, obj=None):
        return False

@admin.register(innavator_models.ProjectRole)
class ProjectRoleAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "project", "user", "role", "is_active")
    readonly_fields = ["snowflake_id"]

    # adding a project role this way makes no sense
    def has_add_permission(self, request):
        return False
    # changing a project role this way makes no sense
    def has_change_permission(self, request, obj=None):
        return False

@admin.register(innavator_models.CommissionRequest)
class CommissionRequestAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "sender", "role", "name")
    readonly_fields = ["snowflake_id"]

    # we DO NOT put words in other peoples' mouths
    def has_add_permission(self, request):
        return False
    # we DO NOT put words in other peoples' mouths
    def has_change_permission(self, request, obj=None):
        return False

@admin.register(innavator_models.Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "group", "name", "start_time")
    readonly_fields = ["snowflake_id", "group"]

    # adding an event this way makes no sense
    def has_add_permission(self, request):
        return False

@admin.register(innavator_models.PortfolioEntry)
class PortfolioEntryAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "user", "name")
    readonly_fields = ["snowflake_id"]

    # we DO NOT put words in other peoples' mouths
    def has_add_permission(self, request):
        return False
    # we DO NOT put words in other peoples' mouths
    def has_change_permission(self, request, obj=None):
        return False

@admin.register(innavator_models.Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "name")
    readonly_fields = ["snowflake_id"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.snowflake_id = innavator_slowflake_generator.__next__()
        return super().save_model(request, obj, form, change)

@admin.register(innavator_models.WillingnessToTutor)
class WillingnessToTutorAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "user", "subject")
    readonly_fields = ["snowflake_id"]

    # adding a willingness to tutor this way makes no sense
    def has_add_permission(self, request):
        return False
    # changing a willingness to tutor this way makes no sense
    def has_change_permission(self, request, obj=None):
        return False
