from rest_framework.permissions import BasePermission
from .utils import get_user_permissions


class IsAuthorized(BasePermission):
    """
    Universal permission checker:
    - Requires authentication
    - ADMIN gets full access
    - Other roles checked via CustomPermission
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        # Admin has full access
        if request.user.role == "ADMIN":
            return True

        required_permission = getattr(view, "required_permission", None)

        # If API does not specify permission, allow access
        if required_permission is None:
            return True

        user_permissions = get_user_permissions(request.user)
        return required_permission in user_permissions
