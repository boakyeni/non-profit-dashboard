from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/campaigns/", include("apps.campaigns.urls")),
    path("api/contact-analytics/", include("apps.contact_analytics.urls")),
    path("api/donor-management/", include("apps.donor_management.urls")),
    path("schedule/", include("schedule.urls")),
    path("mosaico/", include("apps.mosaico.urls")),
    path("api/scheduler/", include("apps.scheduler.urls")),
    path("api/auth/", include("apps.users.urls")),
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
