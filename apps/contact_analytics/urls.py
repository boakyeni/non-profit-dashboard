from . import views
from django.urls import path

urlpatterns = [
    path("", views.CSVUploadView.as_view(), name="CSVUpload"),
]
