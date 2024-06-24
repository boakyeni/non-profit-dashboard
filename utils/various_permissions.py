from rest_framework.exceptions import PermissionDenied


def check_matching_institution_for_campaigns(user, instance):
    if user.is_superuser:
        return
    if user.institution.id != instance.institution.id:
        raise PermissionDenied(
            detail="You do not have permission to perform this action."
        )


def check_matching_institution_for_account(user, instance):
    if user.is_superuser:
        return
    if user.institution.id != instance.institution.id:
        raise PermissionDenied(
            detail="You do not have permission to perform this action."
        )
