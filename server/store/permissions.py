# end Google code

from rest_framework import permissions

from store import models as innavator_models
from store import utils as innavator_utils

class UsersPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'create', 'retrieve', 'get_palette']:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if view.action in ['retrieve', 'get_palette', 'portfolio']:
            return True

        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        if view.action in [
            'request_as_mentor', 'request_as_mentee', 'accept_mentor_request', 'accept_mentee_request', 'remove_mentor', 'remove_mentee'
        ]:
            return True
        if view.action in [
            'mentors', 'mentees', 'requests_as_mentor_from_me', 'requests_as_mentor_to_me', 'requests_as_mentee_from_me', 'requests_as_mentee_to_me',
            'update', 'partial_update', 'destroy', 'patch_palette', 'group_requests_from_me', 'group_requests_to_me'
        ]:
            return obj.user == request.user

        return False

class GroupsPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['clubs']:
            return True

        if not request.user.is_authenticated:
            return False

        if view.action in ['all']:
            return request.user.is_staff

        return True

    def has_object_permission(self, request, view, obj):
        if obj.is_club:
            if view.action in ['projects', 'events']:
                return True

        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        if view.action in ['request_to_join']:
            return obj.is_club
        if view.action in ['update', 'partial_update', 'destroy']:
            return obj.owner.user == request.user

        innavator_user = innavator_utils.get_innavator_user_from_user(request.user)
        if obj.members.contains(innavator_user):
            membership = innavator_models.GroupMembership.objects.get(group=obj, user=innavator_user)
            if view.action in ['accept_invite']:
                return membership.group_accepted and not membership.user_accepted
            if not membership.user_accepted or not membership.group_accepted:
                return False
            if view.action in ['retrieve', 'members', 'leave', 'channels', 'groups', 'projects', 'events']:
                return True
            if membership.is_privileged:
                return True

        return False

class ChannelsPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        if view.action in ['destroy']:
            return obj.group.owner.user == request.user

        innavator_user = innavator_utils.get_innavator_user_from_user(request.user)
        if obj.group.members.contains(innavator_user):
            membership = innavator_models.GroupMembership.objects.get(group=obj.group, user=innavator_user)
            if not membership.user_accepted or not membership.group_accepted:
                return False
            if view.action in ['retrieve']:
                return True
            if membership.is_privileged:
                return True
            if view.action in ['messages', 'unread_message_count']:
                return not obj.read_restricted
            if view.action in ['create_message']:
                return not obj.write_restricted

        return False

class MessagesPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        if obj.sender.user == request.user:
            return True
        elif view.action in ['update', 'partial_update']:
            return False

        innavator_user = innavator_utils.get_innavator_user_from_user(request.user)
        if obj.channel.group.members.contains(innavator_user):
            membership = innavator_models.GroupMembership.objects.get(group=obj.channel.group, user=innavator_user)
            if not membership.user_accepted or not membership.group_accepted:
                return False
            if view.action in ['retrieve']:
                return True
            if membership.is_privileged:
                return True

        return False

class RolesPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve', 'get_commission_requests', 'get_projects']:
            return True

        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        if view.action in ['retrieve', 'get_commission_requests', 'get_projects']:
            return True

        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        return False

class ProjectsPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve', 'members']:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if view.action in ['retrieve', 'active_members', 'members']:
            return True

        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        if view.action in ['request_to_join']:
            return True

        if view.action in ['destroy']:
            return obj.group.owner.user == request.user

        innavator_user = innavator_utils.get_innavator_user_from_user(request.user)
        if obj.group.members.contains(innavator_user):
            membership = innavator_models.GroupMembership.objects.get(group=obj.group, user=innavator_user)
            if not membership.user_accepted or not membership.group_accepted:
                return False
            if view.action in ['leave']:
                return True
            if membership.is_privileged:
                return True

        return False

class CommissionRequestsPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if view.action in ['retrieve']:
            return True

        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        return obj.sender.user == request.user

class EventsPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['retrieve']:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if obj.group.is_club and view.action in ['retrieve']:
            return True

        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        innavator_user = innavator_utils.get_innavator_user_from_user(request.user)
        if obj.group.members.contains(innavator_user):
            membership = innavator_models.GroupMembership.objects.get(group=obj.group, user=innavator_user)
            if not membership.user_accepted or not membership.group_accepted:
                return False
            if view.action in ['retrieve']:
                return True
            if membership.is_privileged:
                return True

        return False

class PortfolioEntriesPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if view.action in ['retrieve']:
            return True

        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        return obj.user.user == request.user

class SubjectsPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve', 'tutors']:
            return True

        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        if view.action in ['add_tutor_willingness', 'remove_tutor_willingness']:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        if view.action in ['retrieve', 'tutors']:
            return True

        if not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True

        if view.action in ['add_tutor_willingness', 'remove_tutor_willingness']:
            return True

        return False
