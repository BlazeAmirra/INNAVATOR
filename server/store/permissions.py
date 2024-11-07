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
        if view.action in ['retrieve', 'get_palette']:
            return True

        if not request.user.is_authenticated:
            return False
        if view.action in [
            'request_as_mentor', 'request_as_mentee', 'accept_mentor_request', 'accept_mentee_request', 'remove_mentor', 'remove_mentee'
        ]:
            return True
        if view.action in [
            'mentors', 'mentees', 'requests_as_mentor_from_me', 'requests_as_mentor_to_me', 'requests_as_mentee_from_me', 'requests_as_mentee_to_me',
            'update', 'partial_update', 'destroy', 'patch_palette', 'group_requests_from_me', 'group_requests_to_me'
        ]:
            return request.user.is_staff or obj.user == request.user

        return False

class GroupsPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['clubs']:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False

        if request.user.is_staff:
            return True

        if view.action in ['request_to_join_group']:
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
            if view.action in ['retrieve', 'members', 'leave']:
                return True
            if view.action in ['requests_from_group', 'requests_to_group', 'invite_to_group', 'remove_user']:
                return membership.is_privileged

        return False
