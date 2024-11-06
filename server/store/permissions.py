# end Google code

from rest_framework import permissions

from store import models as innavator_models
from store import utils as innavator_utils

class UsersPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'create', 'retrieve']:
            return True
        elif view.action in ['update', 'partial_update', 'destroy']:
            return request.user.is_authenticated
        return False

    def has_object_permission(self, request, view, obj):
        if view.action == 'retrieve':
            return True

        if not request.user.is_authenticated:
            return False
        elif view.action in ['update', 'partial_update', 'destroy']:
            return request.user.is_staff or obj.user == request.user

        return False

class PalettesPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'create', 'retrieve']:
            return True
        elif view.action in ['update', 'partial_update', 'destroy']:
            return request.user.is_authenticated
        return False

    def has_object_permission(self, request, view, obj):
        if view.action == 'retrieve':
            return True

        if not request.user.is_authenticated:
            return False
        elif view.action in ['update', 'partial_update', 'destroy']:
            return request.user.is_staff or obj.user.user == request.user

        return False

class GroupsPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False

        if request.user.is_staff:
            return True

        if view.action in ['list_requests_from_me', 'list_requests_to_me']:
            return True

        if view.action in ['update', 'partial_update', 'destroy']:
            return request.user.is_staff or obj.owner.user == request.user

        innavator_user = innavator_utils.get_innavator_user_from_user(request.user)
        if obj.members.contains(innavator_user):
            membership = innavator_models.GroupMembership.objects.get(group=obj, user=innavator_user)
            if view.action in ['retrieve', 'members']:
                return membership.user_accepted and membership.group_accepted
            if view.action in ['list_requests_from_group', 'list_requests_to_group']:
                return membership.is_privileged

        return False
