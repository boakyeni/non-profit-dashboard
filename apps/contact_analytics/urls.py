from django.urls import path, include
from .views import ContactViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("contacts", ContactViewSet, basename="contacts")

urlpatterns = [
    path("", include(router.urls), name="api"),
]
