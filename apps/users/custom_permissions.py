from rest_framework import permissions

"""
Custom permissions to check if user is instituition admin or bsystems admin
"""


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user:
            return False
        return getattr(user, "is_bsystems_admin", False) or getattr(
            user, "is_institution_admin", False
        )


class IsBsystemsAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        user = request.user
        if not user:
            return False
        return getattr(user, "is_bsystems_admin", False)


class IsInstitutionAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        user = request.user
        if not user:
            return False
        return getattr(user, "is_institution_admin", False)
