from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path("campaigns/", include("apps.campaigns.urls")),
    path("contact_analytics/", include("apps.contact_analytics.urls")),
    path("donor_management/", include("apps.donor_management.urls")),
    path("schedule/", include("apps.scheduler.urls")),
]
