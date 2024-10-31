# end Google code

from rest_framework import permissions

class UsersPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'create', 'retrieve']:
            return True
        elif view.action in ['update', 'partial_update', 'destroy']:
            return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if view.action == 'retrieve':
            return True
        
        if not request.user.is_authenticated:
            return False
        elif view.action in ['update', 'partial_update', 'destroy']:
            return obj.user == request.user or request.user.is_staff
        else:
            return False

class PalettesPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'create', 'retrieve']:
            return True
        elif view.action in ['update', 'partial_update', 'destroy']:
            return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if view.action == 'retrieve':
            return True

        if not request.user.is_authenticated:
            return False
        elif view.action in ['update', 'partial_update', 'destroy']:
            return obj.user.user == request.user or request.user.is_staff
        else:
            return False
