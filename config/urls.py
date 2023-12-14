from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/campaigns/", include("apps.campaigns.urls")),
    path("api/contact_analytics/", include("apps.contact_analytics.urls")),
    path("api/donor_management/", include("apps.donor_management.urls")),
    path("schedule/", include("schedule.urls")),
]
