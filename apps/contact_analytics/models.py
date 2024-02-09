from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _
from schedule.models import Event
from django_countries.fields import CountryField

# Create your models here.


class Role(models.TextChoices):
    NONE ="NONE", _("None")
    PATIENT = "PATIENT", _("Patient")
    INSTITUTION = "INSTITUTION", _("Institution")


class Company(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name of Company")
    address = models.CharField(max_length=100, verbose_name="Company Address")
    district = models.CharField(max_length=100, verbose_name="Company District")
    region = models.CharField(max_length=100, verbose_name="Company Region")

    def __str__(self):
        return self.name


class AccountProfile(models.Model):
    name = models.CharField(max_length=250)
    given_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(default="youremail@example.com")
    role_of_account = models.CharField(choices=Role.choices, max_length=100, default=Role.NONE)
    address = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(
        max_length=200,
        null=True,
        choices=CountryField().choices + [("", "Select Country")],
    )
    region = models.CharField(max_length=100, blank=True, null=True)
    organizations = models.ManyToManyField(Company, related_name="account_profiles")

    def __str__(self):
        return self.name


class PhoneNumber(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name of Donor")
    number = PhoneNumberField(
        blank=True,
        max_length=128,
    )
    notes = models.TimeField(auto_now=True, blank=True)
    profile = models.ForeignKey(
        AccountProfile,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, default=None, null=True, blank=True
    )

    def __str__(self):
        return self.name
