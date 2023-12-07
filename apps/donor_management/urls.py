from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_all_donors, name=("get all donors")),
    path("<int:pk>/", views.get_donor_detail, name=("Donor Detail")),
    path("create/", views.create_donor, name=("Create Donor")),
]
