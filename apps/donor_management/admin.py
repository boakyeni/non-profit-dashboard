from django.contrib import admin
from .models import Donor, LeadType, Donation, Expense, Transaction

# Register your models here.

admin.site.register(Donation)
admin.site.register(Expense)
admin.site.register(Transaction)
admin.site.register(Donor)
admin.site.register(LeadType)
