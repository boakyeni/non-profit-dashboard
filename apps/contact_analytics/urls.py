from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    path("upload/", views.CSVUploadView.as_view(), name="CSVUpload"),
]
