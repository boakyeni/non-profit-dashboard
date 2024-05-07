from rest_framework import viewsets
from django.db.models import Count, Min, Avg, Sum
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    parser_classes,
    permission_classes,
    authentication_classes,
)
from rest_framework.parsers import MultiPartParser, FormParser
from datetime import datetime, timedelta
from django.core.mail import EmailMessage
from .models import Donor, Donation, Transaction, Expense
from .serializers import DonorSerializer
from django.template import Template, Context
from apps.mosaico.models import Template as MosaicoTemplate
from apps.contact_analytics.models import AccountProfile
from django.utils.dateparse import parse_date, parse_datetime
from rest_framework_simplejwt.authentication import JWTAuthentication


class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer


def get_specific_time_frame_start_date(days):
    today = datetime.now().date()
    get_specific_time_frame_start_date = today - timedelta(days=days)
    return get_specific_time_frame_start_date


def get_date_range(start_date_str, end_date_str):
    start_date = parse_datetime(start_date_str)
    end_date = parse_datetime(end_date_str)

    if not start_date or not end_date:
        return None, None, None, None
    delta = end_date - start_date
    prev_start_date = start_date - delta - timedelta(days=1)
    prev_end_date = start_date - timedelta(days=1)
    return (start_date, end_date, prev_start_date, prev_end_date)


def parse_and_validate_dates(request):
    start_date_str = request.query_params.get("start_date")
    end_date_str = request.query_params.get("end_date")

    if not start_date_str or not end_date_str:
        return None, Response(
            {"error": "start_date and end_date query parameters are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    start_date, end_date, prev_start_date, prev_end_date = get_date_range(
        start_date_str, end_date_str
    )

    if not start_date or not end_date:
        return None, Response(
            {"error": "Invalid date range provided."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return (start_date, end_date, prev_start_date, prev_end_date), None


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_new_donors_date(request):
    """
    Shows new donors and percent increase
    """
    date_range, error_response = parse_and_validate_dates(request)
    if error_response:
        return error_response  # Return the error response if validation fails

    # Unpack the valid date range
    start_date, end_date, prev_start_date, prev_end_date = date_range
    # Get the first donation date for each donor
    donors_first_donation_dates = Donor.objects.annotate(
        first_donation_date=Min("donations__transaction__date")
    )

    # Filter donors whose first donation is within the specified date range
    new_donors = donors_first_donation_dates.filter(
        first_donation_date__gte=start_date,
        first_donation_date__lte=end_date,
    ).count()

    # Calculate the percentage increase relative to all previous donors
    # This includes donors up to the day before the start_date
    total_donors_before_start = donors_first_donation_dates.filter(
        first_donation_date__lt=start_date,
    ).count()

    if total_donors_before_start > 0:
        new_donors_percentage = (new_donors / total_donors_before_start) * 100
    else:
        new_donors_percentage = 0
    return Response(
        {
            "value": new_donors,  # new_donors_count
            "percent_change": new_donors_percentage,
        }
    )


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_average_donation_amount(request):
    """
    Calculates and shows the average donation amount for donations made within the specified date range,
    and the percent increase compared to the previous period.
    """
    date_range, error_response = parse_and_validate_dates(request)
    if error_response:
        return error_response  # Return the error response if validation fails

    start_date, end_date, prev_start_date, prev_end_date = date_range

    # Calculate the average donation amount for the current period
    current_period_average = (
        Donation.objects.filter(
            transaction__date__range=[start_date, end_date]
        ).aggregate(average_amount=Avg("transaction__amount"))["average_amount"]
        or 0
    )

    # Calculate the average donation amount for the previous period
    previous_period_average = (
        Donation.objects.filter(
            transaction__date__range=[prev_start_date, prev_end_date]
        ).aggregate(average_amount=Avg("transaction__amount"))["average_amount"]
        or 0
    )

    # Calculate the percent change
    if previous_period_average > 0:
        percent_change = (
            (current_period_average - previous_period_average) / previous_period_average
        ) * 100
    else:
        percent_change = 0 if current_period_average == 0 else "Infinity"

    return Response(
        {
            "value": current_period_average,  # current_period_average_donation_amount
            "previous_period_average_donation_amount": previous_period_average,
            "percent_change": percent_change,
        }
    )


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
def cost_per_dollar_raised_view(request):
    date_range, error_response = parse_and_validate_dates(request)
    if error_response:
        return error_response  # Return the error response if validation fails

    # Unpack the valid date range
    start_date, end_date, prev_start_date, prev_end_date = date_range

    # Current period calculations
    current_expenses = (
        Expense.objects.filter(
            transaction__date__range=[start_date, end_date]
        ).aggregate(total=Sum("transaction__amount"))["total"]
        or 0
    )
    current_raised = (
        Donation.objects.filter(
            transaction__date__range=[start_date, end_date]
        ).aggregate(total=Sum("transaction__amount"))["total"]
        or 0
    )
    current_cost_per_dollar = current_expenses / current_raised if current_raised else 0

    # Previous period calculations
    prev_expenses = (
        Expense.objects.filter(
            transaction__date__range=[prev_start_date, prev_end_date]
        ).aggregate(total=Sum("transaction__amount"))["total"]
        or 0
    )
    prev_raised = (
        Donation.objects.filter(
            transaction__date__range=[prev_start_date, prev_end_date]
        ).aggregate(total=Sum("transaction__amount"))["total"]
        or 0
    )
    prev_cost_per_dollar = prev_expenses / prev_raised if prev_raised else 0

    # Percentage change
    if prev_cost_per_dollar > 0:
        percentage_change = (
            (current_cost_per_dollar - prev_cost_per_dollar) / prev_cost_per_dollar
        ) * 100
    else:
        percentage_change = 0 if current_cost_per_dollar == 0 else 100

    return Response(
        {
            "value": current_cost_per_dollar,  # current_period_cost_per_dollar_raised
            "previous_period_cost_per_dollar_raised": prev_cost_per_dollar,
            "percent_change": percentage_change,
        }
    )


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
def donor_churn_rate_view(request):
    date_range, error_response = parse_and_validate_dates(request)
    if error_response:
        return error_response  # Return the error response if validation fails

    start_date, end_date, prev_start_date, prev_end_date = date_range

    # Calculate the date range for the period before the previous period (pre-previous period)
    pre_prev_period_length = prev_start_date - prev_end_date
    pre_prev_start_date = prev_start_date - pre_prev_period_length - timedelta(days=1)
    pre_prev_end_date = prev_start_date - timedelta(days=1)

    # Donors in the current, previous, and pre-previous periods
    current_donors = (
        Donation.objects.filter(transaction__date__range=[start_date, end_date])
        .values_list("donor", flat=True)
        .distinct()
    )
    previous_donors = (
        Donation.objects.filter(
            transaction__date__range=[prev_start_date, prev_end_date]
        )
        .values_list("donor", flat=True)
        .distinct()
    )
    pre_previous_donors = (
        Donation.objects.filter(
            transaction__date__range=[pre_prev_start_date, pre_prev_end_date]
        )
        .values_list("donor", flat=True)
        .distinct()
    )

    # Calculate churned donors for the current vs previous period
    churned_donors_current = previous_donors.exclude(pk__in=current_donors).count()
    total_previous_donors = previous_donors.count()
    current_churn_rate = (
        (churned_donors_current / total_previous_donors * 100)
        if total_previous_donors > 0
        else 0
    )

    # Calculate churned donors for the previous vs pre-previous period
    churned_donors_previous = pre_previous_donors.exclude(
        pk__in=previous_donors
    ).count()
    total_pre_previous_donors = pre_previous_donors.count()
    previous_churn_rate = (
        (churned_donors_previous / total_pre_previous_donors * 100)
        if total_pre_previous_donors > 0
        else 0
    )

    # Calculate the percent change in churn rate
    if previous_churn_rate > 0:
        percent_change = (
            (current_churn_rate - previous_churn_rate) / previous_churn_rate
        ) * 100
    else:
        percent_change = "Infinity" if current_churn_rate > 0 else 0

    return Response(
        {
            "value": current_churn_rate,  # current_churn_rate
            "previous_churn_rate": previous_churn_rate,
            "percent_change": percent_change,
        }
    )


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
def total_contribution_view(request):
    # Reuse the start_date_str, end_date_str, and validation logic from donor_churn_rate_view
    date_range, error_response = parse_and_validate_dates(request)
    if error_response:
        return error_response  # Return the error response if validation fails

    # Unpack the valid date range
    start_date, end_date, prev_start_date, prev_end_date = date_range

    # Current period total contributions
    current_contributions = (
        Donation.objects.filter(
            transaction__date__range=[start_date, end_date]
        ).aggregate(total=Sum("transaction__amount"))["total"]
        or 0
    )

    # Previous period total contributions
    previous_contributions = (
        Donation.objects.filter(
            transaction__date__range=[prev_start_date, prev_end_date]
        ).aggregate(total=Sum("transaction__amount"))["total"]
        or 0
    )

    # Calculate the percentage change
    if previous_contributions > 0:
        percentage_change = (
            (current_contributions - previous_contributions) / previous_contributions
        ) * 100
    else:
        percentage_change = 0 if current_contributions == 0 else 100

    return Response(
        {
            "value": current_contributions,
            "previous_contributions": previous_contributions,
            "percent_change": percentage_change,
        }
    )


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
def donor_retention_rate_view(request):
    # Reuse the start_date_str, end_date_str, and validation logic from donor_churn_rate_view
    date_range, error_response = parse_and_validate_dates(request)
    if error_response:
        return error_response

    start_date, end_date, prev_start_date, prev_end_date = date_range

    # Calculate the date range for the pre-previous period (the one before the previous period)
    pre_prev_period_length = prev_start_date - prev_end_date
    pre_prev_start_date = prev_start_date - pre_prev_period_length - timedelta(days=1)
    pre_prev_end_date = prev_start_date - timedelta(days=1)

    # Donors in the current, previous, and pre-previous periods
    current_donors = (
        Donation.objects.filter(transaction__date__range=[start_date, end_date])
        .values_list("donor", flat=True)
        .distinct()
    )
    previous_donors = (
        Donation.objects.filter(
            transaction__date__range=[prev_start_date, prev_end_date]
        )
        .values_list("donor", flat=True)
        .distinct()
    )
    pre_previous_donors = (
        Donation.objects.filter(
            transaction__date__range=[pre_prev_start_date, pre_prev_end_date]
        )
        .values_list("donor", flat=True)
        .distinct()
    )

    # Calculate retained donors for the current vs previous period
    retained_donors_current = previous_donors.filter(pk__in=current_donors).count()
    total_previous_donors = previous_donors.count()
    current_retention_rate = (
        (retained_donors_current / total_previous_donors * 100)
        if total_previous_donors > 0
        else 0
    )

    # Calculate retained donors for the previous vs pre-previous period
    retained_donors_previous = pre_previous_donors.filter(
        pk__in=previous_donors
    ).count()
    total_pre_previous_donors = pre_previous_donors.count()
    previous_retention_rate = (
        (retained_donors_previous / total_pre_previous_donors * 100)
        if total_pre_previous_donors > 0
        else 0
    )

    # Calculate the percent change in retention rate
    if previous_retention_rate > 0:
        percent_change = (
            (current_retention_rate - previous_retention_rate) / previous_retention_rate
        ) * 100
    else:
        percent_change = "Infinity" if current_retention_rate > 0 else 0

    return Response(
        {
            "value": current_retention_rate,
            "previous_retention_rate": previous_retention_rate,
            "percent_change": percent_change,
        }
    )


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
def send_html_email_with_attachment(request):
    """
    Current design could be a problem without asynchronous task queue, could even still be a problem with it
    """
    print("reached")
    subject = request.data.get("subject")
    template_id = request.data.get("template_id")
    files = request.FILES.getlist("files")  # 'files' is the name attribute in your form
    recipient_ids = request.data.getlist("recipientIds")
    print(recipient_ids, "rec")
    # get html
    try:
        mosaico_template_instance = MosaicoTemplate.objects.get(id=template_id)
    except MosaicoTemplate.DoesNotExist:
        return Response(
            {"Email Not Sent, template not found"}, status=status.HTTP_400_BAD_REQUEST
        )
    html_content = mosaico_template_instance.html

    # get account emails

    for recipient in recipient_ids:
        try:
            account_instance = AccountProfile.objects.get(id=recipient)
            print(account_instance, "acc")
        except AccountProfile.DoesNotExist:
            continue

        context = Context(
            {
                "mail": account_instance.email,
                "unsubscribe_link": "example.com/unsubscribe",
            }
        )
        template = Template(html_content)
        rendered_html = template.render(context)

        email = EmailMessage(
            subject,
            rendered_html,
            "from@yourdomain.com",
            to=[
                account_instance.email
            ],  # Use bcc instead of to for privacy when sending to multiple, not needed here since we send individually
        )

        # Specify email body is HTML
        email.content_subtype = "html"

        for file in files:
            file.seek(0)
            email.attach(file.name, file.read(), file.content_type)

        # Send the email
        try:
            email.send(fail_silently=False)
        except Exception as e:
            print(e)

    return Response(status=status.HTTP_200_OK)
