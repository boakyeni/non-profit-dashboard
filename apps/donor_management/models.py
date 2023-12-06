from django.db import models

# Create your models here.
class Donor(models.Model):
    name = models.CharField(max_length=100, verbose_name="Donor Name")
    email = models.EmailField(max_length=100, verbose_name="Email")

class LeadType(models.Model):
    Donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    type = models.CharField(max_length=100, verbose_name="Lead Type")

class LeadAcquisition(models.Model):
    Donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    acquisition = models.CharField(max_length=100, verbose_name="Lead Acquisition")

def __str__(self):
    return self.name
