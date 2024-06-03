from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from phonenumber_field.modelfields import PhoneNumberField
from schedule.models import Calendar

# Create your models here.


# class InstitutionAdmin(models.Model):
#     name = models.CharField(max_length=100, verbose_name="Institution Name")
#     email = models.EmailField(verbose_name="Email Address")
#     address = models.CharField(max_length=200, verbose_name="Institution Address")
#     bussiness_cert = models.CharField(
#         max_length=100, verbose_name="Business Certificate"
#     )

#     def __str__(self):
#         return self.name


class User(AbstractUser):
    """
    Use <user>.tasks.all() to get tasks assigned to this user
    Use <user>.my_created_tasks.all() to get all task assigned by this user
    """

    # add type car owner, admin, parking attendant
    username = None
    first_name = models.CharField(verbose_name=_("First Name"), max_length=50)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=50)
    email = models.EmailField(verbose_name=_("Email Address"), unique=True)
    phone_number = PhoneNumberField(
        verbose_name=_("Phone Number"), max_length=30, blank=True, null=True
    )
    is_bsystems_user = models.BooleanField(
        verbose_name=_("Is Bsystems User"), default=False
    )
    is_institution_admin = models.BooleanField(
        verbose_name=_("Is Institution Admin"), default=False
    )
    is_instituition_user = models.BooleanField(
        verbose_name=_("Is Institution User"), default=False
    )
    reference = models.CharField(
        verbose_name=_("Account Reference"), max_length=250, blank=True, null=True
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
    ]

    # class Meta:
    #     permissions = [
    #         ("approve_institution", "Can approve institution"),
    #         ("change_institution_status", "Can change institution status"),
    #         ("approve_campaign", "Can approve campaign"),
    #         ("change_campaign_status", "Can change campaign status"),
    #         ("create_other_users", "Can create other users"),
    #         ("create_campaigns", "Can create campaigns"),
    #         ("approve_other_campaigns", "Can approve other campaigns"),
    #         ("create_tasks", "Can create tasks"),
    #         ("create_events", "Can create events"),
    #         (
    #             "view_all_tasks_campaigns_events",
    #             "Can view all tasks, campaigns, and events",
    #         ),
    #         ("change_user_status", "Can change user status"),
    #         ("change_own_password", "Can change own password"),
    #         ("change_other_passwords", "Can change other users' passwords"),
    #     ]

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
