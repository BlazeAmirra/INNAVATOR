#!/usr/bin/python

from django.contrib import admin

from store import models as innavator_models
from store import snowflake_id as innavator_snowflake

# create list and detail pages for the given model, with the class describing page attributes
@admin.register(innavator_models.InnavatorUser)
class InnavatorUserAdmin(admin.ModelAdmin):
    # model fields or display fields ("my_email") to show in the list interface (as opposed to the details interface)
    list_display = ("snowflake_id", "my_email", "full_name", "preferred_name")
    # fields that may not be edited through the details interface for this model's page. snowflakes should never be edited, and there's already a user model editor
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
    # "__" is used to access compound fields
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

    # called when saving or creating an object through this interface.
    # change is False when creating a new instance
    def save_model(self, request, obj, form, change):
        if not change:
            obj.snowflake_id = innavator_snowflake.get_snowflake_id()
        return super().save_model(request, obj, form, change)

@admin.register(innavator_models.Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "group", "name", "is_active", "is_interactive")
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
            obj.snowflake_id = innavator_snowflake.get_snowflake_id()
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

@admin.register(innavator_models.ProjectSubject)
class ProjectSubjectAdmin(admin.ModelAdmin):
    list_display = ("snowflake_id", "project", "subject")
    readonly_fields = ["snowflake_id"]

    # adding a project role this way makes no sense
    def has_add_permission(self, request):
        return False
    # changing a project role this way makes no sense
    def has_change_permission(self, request, obj=None):
        return False
