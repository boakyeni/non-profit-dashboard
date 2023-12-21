from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from apps.donor_management.models import Donor
from apps.campaigns.models import Patient


# Create your models here.
class Contact(models.Model):
    donorsInfo = models.ManyToManyField(Donor, default=None)
    parentsOfPatient = models.ManyToManyField(Patient, default=None)
    nameOfDonor = models.CharField(max_length=50, verbose_name="Name of Donor")
    meetingStatus = models.CharField(max_length=50, verbose_name="Meeting Status")
    phone = PhoneNumberField(blank=True, max_length=128, verbose_name="Phone")
    email = models.EmailField(max_length=50, verbose_name="Email")

    def __str__(self):
        return self.nameOfDonor
