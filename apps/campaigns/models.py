from django.db import models
from apps.contact_analytics.models import AccountProfile
from datetime import date

# from .cause import Cause


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


class Beneficairies(models.Model):
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


class EducationalInstitution(models.Model):
    INSTITUTION_TYPE_CHOICES = [
        ("Primary", "Primary"),
        ("Secondary", "Secondary"),
        ("University", "University"),
        ("Orphanage", "Orphanage"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    institution_type = models.CharField(max_length=50, choices=INSTITUTION_TYPE_CHOICES)
    number_of_students = models.IntegerField(default=0)
    programs_offered = models.TextField(blank=True, null=True)
    accreditation_details = models.TextField(blank=True, null=True)


class HealthcareInstitution(models.Model):
    INSTITUTION_TYPE_CHOICES = [
        ("Hospital", "Hospital"),
        ("Clinic", "Clinic"),
        ("Health Center", "Health Center"),
        ("Senior Homes", "Senior Homes"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    institution_type = models.CharField(max_length=50, choices=INSTITUTION_TYPE_CHOICES)
    number_of_beds = models.IntegerField(default=0)
    specializations = models.TextField(blank=True, null=True)
    operating_hours = models.TextField(blank=True, null=True)


class Animal(models.Model):
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    species = models.CharField(max_length=255)
    # Maybe use a choices
    health_status = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    special_needs = models.TextField(blank=True, null=True)


class SocialWelfareProgram(models.Model):
    PROGRAM_TYPE_CHOICES = [
        ("Food Aid", "Food Aid"),
        ("Shelter", "Shelter"),
        ("Education", "Education"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    program_name = models.CharField(max_length=255)
    program_type = models.CharField(max_length=50, choices=PROGRAM_TYPE_CHOICES)
    target_population = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)
    key_activities = models.TextField(blank=True, null=True)
    impact_metrics = models.TextField(blank=True, null=True)


class EmergencyRelief(models.Model):
    RELIEF_TYPE_CHOICES = [
        ("Natural Disaster", "Natural Disaster"),
        ("Conflict", "Conflict"),
        ("Pandemic", "Pandemic"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    relief_type = models.CharField(max_length=50, choices=RELIEF_TYPE_CHOICES)
    area_covered = models.TextField(blank=True, null=True)
    contact_organization = models.TextField(blank=True, null=True)
    number_of_beneficiaries = models.IntegerField(default=0)
    key_services_provided = models.TextField(blank=True, null=True)


class EnvironmentalProtection(models.Model):
    CONSERVATION_TYPE_CHOICES = [
        ("Reforestation", "Reforestation"),
        ("Wildlife Protection", "Wildlife Protection"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    organization_name = models.CharField(max_length=255)
    project_name = models.CharField(max_length=255)
    location = models.TextField(blank=True, null=True)
    conservation_type = models.CharField(
        max_length=50, choices=CONSERVATION_TYPE_CHOICES
    )
    impact_metrics = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)


class CommunityDevelopment(models.Model):
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=255)
    community_name = models.CharField(max_length=255)
    location = models.TextField(blank=True, null=True)
    key_objectives = models.TextField(blank=True, null=True)
    impact_metrics = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)


class DisabilitySupport(models.Model):
    SUPPORT_TYPE_CHOICES = [
        ("Financial Aid", "Financial Aid"),
        ("Equipment", "Equipment"),
        ("Training", "Training"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    support_type = models.CharField(max_length=50, choices=SUPPORT_TYPE_CHOICES)
    organization_name = models.CharField(max_length=255)
    number_of_beneficiaries = models.IntegerField(default=0)
    key_services_provided = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)
