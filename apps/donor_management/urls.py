from django.urls import path, include
from .views import DonorViewSet, send_html_email_with_attachment
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("donors", DonorViewSet, basename="Donor Management")

urlpatterns = [
    path("", include(router.urls), name="api"),
    path("send-newsletter/", send_html_email_with_attachment),
]
