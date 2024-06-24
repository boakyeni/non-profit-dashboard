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
    ANIMAL = "ANIMAL", _("Animal")
    SOCIAL_WELFARE_PROGRAM = "SOCIAL_WELFARE_PROGRAM", _("Social Welfare Program")
    EMERGENCY_RELIEF = "EMERGENCY_RELIEF", _("Emergency Relief")
    ENVIRONMENTAL_PROTECTION = "ENVIRONMENTAL_PROTECTION", _(
        "Environmental Protection/Conservation"
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
    """
    Holds common fields to beneficiaries
    """

    name = models.CharField(max_length=250, blank=True)
    given_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    beneficiary_type = models.CharField(
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
    website = models.URLField(blank=True, null=True)
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
    name = models.CharField(max_length=255, blank=True, null=True)
    # if no name for number is given just use name from profile
    number = PhoneNumberField(blank=True, max_length=128)
    primary_contact = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    relation = models.CharField(max_length=255, blank=True, null=True)
    profile = models.ForeignKey(
        AccountProfile, on_delete=models.CASCADE, related_name="phone_number"
    )

    def __str__(self):
        return str(self.number) if self.number else "unknown number"
