from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CampaignViewSet,
    PatientViewSet,
    CampaignCauseViewSet,
)
from . import views


router = DefaultRouter()
router.register("campaigns", CampaignViewSet, basename="campaigns")
router.register("patients", PatientViewSet, basename="patients")
router.register("causes", CampaignCauseViewSet, basename="causes")


urlpatterns = [
    # path("", include(router.urls)),
    path("add-cause/", views.create_cause),
    path("edit-cause/", views.edit_cause),
    path("get-causes/", views.GetCauses.as_view()),
    path("", views.GetCampaigns.as_view()),
    path("create-campaign/", views.create_campaign),
    path("edit-campaign/", views.edit_campaign),
    path("delete-campaign/", views.delete_campaign),
    path("add-beneficiary/", views.add_beneficiaries_to_campaign),
]
