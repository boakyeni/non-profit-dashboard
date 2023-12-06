from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class Contact(models.Model):
    nameOfDonor = models.CharField(max_length=50)
    meetingStatus = models.CharField(max_length=50)
    phone = PhoneNumberField(blank=True)
    email = models.EmailField(max_length=50)

    def __str__(self):
        return self.nameOfDonor
