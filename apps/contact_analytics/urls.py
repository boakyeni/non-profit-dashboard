from django.urls import path
from .views import (
    get_all_contacts,
    get_contact_detail,
    create_contact,
    update_contact,
    delete_contact,
)

urlpatterns = [
    path("all/", get_all_contacts, name="get_all_contacts"),
    path("<int:pk>/", get_contact_detail, name="get_contact_detail"),
    path("create/", create_contact, name="create_contact"),
    path("update/<int:pk>/", update_contact, name="update_contact"),
    path("delete/<int:pk>/", delete_contact, name="delete_contact"),
]
