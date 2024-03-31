from django.contrib import admin
from .models import AdditionalEventInfo, AdditionalCalendarInfo

# Register your models here.

admin.site.register(AdditionalEventInfo)
admin.site.register(AdditionalCalendarInfo)
