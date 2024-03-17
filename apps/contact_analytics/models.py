from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _
from schedule.models import Event

# Create your models here.


class Role(models.TextChoices):
    PATIENT = "PATIENT", _("Patient")
    INSTITUTION = "INSTITUTION", _("Institution")


# class Contact(models.Model):
#     Donor = models.ForeignKey(Donor, on_delete=models.CASCADE, default=None)
#     nameOfDonor = models.CharField(max_length=50, verbose_name="Name of Donor")
#     meetingStatus = models.CharField(max_length=50, verbose_name="Meeting Status")
#     phone = PhoneNumberField(blank=True, max_length=128, verbose_name="Phone")
#     email = models.EmailField(max_length=50, verbose_name="Email")

#     def __str__(self):
#         return self.nameOfDonor


class Company(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name of Company")
    address = models.CharField(
        max_length=100, verbose_name="Company Address", blank=True, null=True
    )
    district = models.CharField(
        max_length=100, verbose_name="Company District", blank=True, null=True
    )
    region = models.CharField(
        max_length=100, verbose_name="Company Region", blank=True, null=True
    )

    def __str__(self):
        return self.name


class AccountProfile(models.Model):
    name = models.CharField(max_length=250)
    given_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    role = models.CharField(
        max_length=20,
        choices=Role,
        blank=True,
        null=True,
    )
    address = models.CharField(max_length=100, blank=True, null=True)
    # change to django countries
    country = models.CharField(max_length=100, blank=True, null=True)
    region = models.CharField(max_length=100, blank=True, null=True)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, default=None, blank=True, null=True
    )

    def __str__(self):
        return self.name


class PhoneNumber(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name of Donor")
    number = PhoneNumberField(blank=True, max_length=128)
    notes = models.TimeField(auto_now=True, blank=True)
    profile = models.ForeignKey(
        AccountProfile, on_delete=models.CASCADE, related_name="phone_number"
    )

    def __str__(self):
        return self.name
