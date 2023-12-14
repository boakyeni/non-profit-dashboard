from django.contrib import admin
from .models import Donation, Patient, MonetaryCampaign, Cause

# Register your models here.
admin.site.register(Donation)
admin.site.register(MonetaryCampaign)
admin.site.register(Patient)
admin.site.register(Cause)
