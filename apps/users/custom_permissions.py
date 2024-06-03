from rest_framework import permissions
from django.contrib.auth.models import Permission


class CustomUserPermission(permissions.BasePermission):
    """
    Custom permission to assign permissions based on user attributes.
    """

    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated:
            return False

        self.Users(user)
        return True