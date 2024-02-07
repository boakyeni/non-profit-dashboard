from rest_framework import viewsets
from django.db.models import Count
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from datetime import datetime, timedelta
from django.core.mail import EmailMessage
from .models import Donor
from .serializers import DonorSerializer
from django.template import Template, Context
from apps.mosaico.models import Template as MosaicoTemplate


class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer


def get_specific_time_frame_start_date(days):
    today = datetime.now().date()
    get_specific_time_frame_start_date = today - timedelta(days=days)
    return get_specific_time_frame_start_date


def new_donors_count():
    start_date = get_specific_time_frame_start_date(days=30)
    new_donors = Donor.objects.filter(donation__donation_date__gte=start_date)
    return new_donors.count()


@api_view(["GET"])
def new_donors_percentage(request):
    total_donors = Donor.objects.aggregate(count=Count("id"))["count"]
    if total_donors != 0:
        new_donors_count = new_donors_count()
        return Response((new_donors_count / total_donors) * 100)
    else:
        return Response(0)


@api_view(["GET"])
def get_new_donors_date(request):
    start_date = request.query_params.get("start_date")
    end_date = request.query_params.get("end_date")
    total_donors_before_start = Donor.objects.filter(
        donation__donation_date__lte=start_date,
    )
    current_donors = Donor.objects.filter(
        donation__donation_date__gte=start_date,
    )
    new_donors = set(current_donors) - set(total_donors_before_start)
    new_donors = len(new_donors)
    total_donors_before_start = len(total_donors_before_start)

    if total_donors_before_start > 0:
        new_donors_percentage = (new_donors / total_donors_before_start) * 100
    else:
        new_donors_percentage = 0
    return Response(
        {
            "new_donors_count": new_donors,
            "new_donors_percentage": new_donors_percentage,
        }
    )


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def send_html_email_with_attachment(request):
    """
    Current design could be a problem without asynchronous task queue, could even still be a problem with it
    """
    html_content = """
    <html>
        <body>
            <h1>This is a heading</h1>
            <p>This is a paragraph of text in the email body.</p>
        </body>
    </html>
    """
    template_id = request.POST.get("template_id")
    files = request.FILES.getlist("files")  # 'files' is the name attribute in your form
    recipient_ids = request.POST.getlist("recipientIds")
    # get emails
    try:
        mosaico_template_instance = MosaicoTemplate.objects.get(id=template_id)
    except MosaicoTemplate.DoesNotExist:
        return Response(
            {"Email Not Sent, template not found"}, status=status.HTTP_400_BAD_REQUEST
        )
    html_content = mosaico_template_instance.html
    recipients = []
    for recipient in recipients:
        context = Context(
            {
                "mail": recipient,
                "unsubscribe_link": "http://example.com/unsubscribe",
            }
        )
        template = Template(html_content)
        rendered_html = template.render(context)

        email = EmailMessage(
            "Subject Here",
            rendered_html,
            "from@yourdomain.com",
            to=[
                recipient
            ],  # Use bcc instead of to for privacy when sending to multiple, not needed here since we send individually
        )

        # Specify email body is HTML
        email.content_subtype = "html"

        for file in files:
            email.attach(file.name, file.read(), file.content_type)

        # Send the email
        email.send()

    return Response(status=status.HTTP_200_OK)
