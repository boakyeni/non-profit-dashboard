from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path("send-newsletter/", views.send_html_email_with_attachment),
    path("total-contribution/", views.total_contribution_view),
    path("donor-retention/", views.donor_retention_rate_view),
    path("acquisition/", views.get_new_donors_date),
    path("average/", views.get_average_donation_amount),
    path("churn/", views.donor_churn_rate_view),
    path("cost-per/", views.cost_per_dollar_raised_view),
]
