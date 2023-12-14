from django.urls import path, include
from .views import DonorViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("donors", DonorViewSet, basename="Donor Management")

urlpatterns = [
    path("api/", include(router.urls), name="api"),
]
