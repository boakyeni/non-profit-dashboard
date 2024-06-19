from django.contrib import admin
from .models import (
    HealthcarePatient,
    MonetaryCampaign,
    Cause,
    HealthcareInstitution,
    CommunityDevelopment,
    DisabilitySupport,
    Animal,
    EducationalInstitution,
    SocialWelfareProgram,
    EmergencyRelief,
    EnvironmentalProtection,
    Photo,
)

# Register your models here.
admin.site.register(MonetaryCampaign)
admin.site.register(HealthcarePatient)
admin.site.register(Cause)
admin.site.register(HealthcareInstitution)
admin.site.register(CommunityDevelopment)
admin.site.register(DisabilitySupport)
admin.site.register(Animal)
admin.site.register(EducationalInstitution)
admin.site.register(SocialWelfareProgram)
admin.site.register(EmergencyRelief)
admin.site.register(EnvironmentalProtection)
admin.site.register(Photo)
