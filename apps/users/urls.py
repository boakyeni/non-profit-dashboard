from django.urls import path
from . import views

urlpatterns = [
    path("password-reset/", views.custom_password_reset_view),
    path("password-confirm/", views.custom_password_reset_confirm_view),
]
