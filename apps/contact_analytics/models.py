from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _
from schedule.models import Event
from apps.users.models import Institution

# Create your models here.


class Beneficiary(models.TextChoices):
    # PATIENT = "PATIENT", _("Patient")
    EDUCATIONAL_INSTITUTION = "EDUCATIONAL_INSTITUTION", _("Educational Institution")
    HEALTHCARE_INSTITUTION = "HEALTHCARE_INSTITUTION", _("Healthcare Institution")
    HEALTHCARE_PATIENT = "HEALTHCARE_PATIENT", _("Healthcare Patient")
    ANIMALS = "ANIMALS", _("Animals")
    SOCIAL_WELFARE_PROGRAMS = "SOCIAL_WELFARE_PROGRAMS", _("Social Welfare Programs")
    EMERGENCY_RELIEF = "EMERGENCY_RELIEF", _("Emergency Relief")
    ENVIRONMENTAL_PROTECTION = "ENVIRONMENTAL_PROTECTION", _(
        "Environmental Protection/Conversation"
    )
    COMMUNITY_DEVELOPMENT = "COMMUNITY_DEVELOPMENT", _("Community Development")
    DISABILITY_SUPPORT = "DISABILITY_SUPPORT", _("Disability Support")

    def __str__(self):
        return self.value


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
    name = models.CharField(max_length=250, blank=True)
    given_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    benficiary = models.CharField(
        max_length=250,
        choices=Beneficiary.choices,
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
    profile_photo = models.FileField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_beneficiary = models.BooleanField(default=False)
    # This holds an institutions Donors and Beneficiaries, all listed as contacts
    associated_institution = models.ForeignKey(
        Institution,
        related_name="contacts",
        on_delete=models.PROTECT,
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name


class PhoneNumber(models.Model):
    number = PhoneNumberField(blank=True, max_length=128)
    notes = models.TimeField(auto_now=True, blank=True)
    profile = models.ForeignKey(
        AccountProfile, on_delete=models.CASCADE, related_name="phone_number"
    )

    def __str__(self):
        return str(self.number) if self.number else None
