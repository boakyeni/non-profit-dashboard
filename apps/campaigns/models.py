from django.db import models
from apps.contact_analytics.models import AccountProfile
from datetime import date

# from .cause import Cause

BENEFICAIRY = (
    ("educational_institutions", "Educational Institutions"),
    ("healthcare_institutions", "Healthcare Institutions"),
    ("healthcare_patient", "Healthcare Patient"),
    ("animals", "Animals"),
    ("social_welfarer_programs", "Social Welfarer Programs"),
    ("emergency_relief", "Emergency Relief"),
    ("environmental_protection", "Environmental Protection/Conversation"),
    ("community_development", "Community Development"),
    ("disability_support", "Disability Support"),
)


class MonetaryCampaign(models.Model):
    name = models.CharField(max_length=100)
    progress = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    goal = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    description = models.TextField(max_length=250, blank=True, null=True)
    start_date = models.DateTimeField(default=date.today)
    end_date = models.DateTimeField(blank=True, null=True)
    subscribers = models.ManyToManyField(AccountProfile, blank=True)
    photo = models.FileField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Cause(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title if self.title else "Cause"


class Patient(models.Model):
    profile = models.OneToOneField(
        AccountProfile,
        on_delete=models.CASCADE,
        default=None,
        related_name="patient_profile",
    )
    hospital = models.CharField(max_length=100, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    illness = models.CharField(max_length=100, blank=True, null=True)
    causes = models.ManyToManyField(Cause, blank=True, related_name="patients")

    def __str__(self):
        return self.profile.name
