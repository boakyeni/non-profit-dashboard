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

    bsystems_user = models.BooleanField(
        verbose_name=_("Is Bsystems User"), default=False
    )
    institution_admin = models.BooleanField(
        verbose_name=_("Is Institution Admin"), default=False
    )
    reference = models.CharField(
        verbose_name=_("Account Reference"), max_length=250, blank=True, null=True
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "bsytems_admin",
    ]

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
