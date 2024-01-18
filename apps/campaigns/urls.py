from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CampaignViewSet,
    PatientViewSet,
    DonorViewSet,
    CampaignCauseViewSet,
)


router = DefaultRouter()
router.register("campaigns", CampaignViewSet, basename="campaigns")
router.register("patients", PatientViewSet, basename="patients")
router.register("donors", DonorViewSet, basename="donors")
router.register("causes", CampaignCauseViewSet, basename="causes")


urlpatterns = [
    path("", include(router.urls)),
]
