from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from apps.donor_management.models import Donor


# Create your models here.
class Contact(models.Model):
    Donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    nameOfDonor = models.CharField(max_length=50)
    meetingStatus = models.CharField(max_length=50)
    phone = PhoneNumberField(blank=True)
    email = models.EmailField(max_length=50)

    def __str__(self):
        return self.nameOfDonor
