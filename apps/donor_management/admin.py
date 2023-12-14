from django.contrib import admin
from .models import Donor, LeadType, LeadAcquisition

# Register your models here.
admin.site.register(Donor)
admin.site.register(LeadType)
admin.site.register(LeadAcquisition)
