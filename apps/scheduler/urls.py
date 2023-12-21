from django.urls import path, include
from .views import EventViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("events", EventViewSet, basename="events")
# router.register("rules", RuleViewSet, basename="rules")

urlpatterns = [
  path("api/", include(router.urls), name="api"),
]
