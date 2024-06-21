from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from phonenumber_field.modelfields import PhoneNumberField
from schedule.models import Calendar
import uuid

# Create your models here.


class Institution(models.Model):
    id = models.UUIDField(
        primary_key=True, unique=True, default=uuid.uuid4, editable=False
    )
    # institution id should not be guessable
    name = models.CharField(max_length=255, verbose_name="Institution Name")

    def __str__(self):
        return f"{self.name} {self.id}"


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
    institution_admin = models.BooleanField(
        verbose_name=_("Is Institution Admin"), db_default=False, blank=True, null=True
    )
    reference = models.CharField(
        verbose_name=_("Account Reference"), max_length=250, blank=True, null=True
    )
    institution = models.ForeignKey(
        Institution,
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        related_name="users",
    )
    timezone = models.CharField(max_length=50, default="UTC")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
    ]

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
