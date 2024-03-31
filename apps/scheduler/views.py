from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from schedule.models import Event, Rule
from .serializers import (
    EventSerializer,
    RuleSerializer,
    CalendarSerializer,
    AdditionalCalendarInfoSerializer,
)
from .models import AdditionalCalendarInfo

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from schedule.models import Event, Occurrence, Rule, Calendar
from .serializers import (
    EventSerializer,
    OccurrenceSerializer,
    RuleSerializer,
    AdditionalEventInfoSerializer,
)
from schedule.periods import Period
from schedule.utils import OccurrenceReplacer
from datetime import datetime, timedelta
from django.db import transaction
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from rest_framework_simplejwt.authentication import (
    JWTAuthentication,
    JWTStatelessUserAuthentication,
)
from django.utils.text import slugify


class EventCreateView(APIView):
    @transaction.atomic
    def post(self, request, format=None):
        data = request.data
        # Rule have to be created manually but this should prevent duplications
        if request.data.get("rule"):
            try:
                rule = Rule.objects.get(frequency=request.data.get("rule"))
            except Rule.DoesNotExist:
                # Create Rule
                rule_data = {
                    "name": request.data.get("rule"),
                    "description": request.data.get("rule"),
                    "frequency": request.data.get("rule"),
                }
                rule_serializer = RuleSerializer(data=rule_data)
                rule_serializer.is_valid(raise_exception=True)
                rule = rule_serializer.save()
            data["rule"] = rule.id
        """
        HERE WE ARE TESTING, THIS SHOULD BE REPLACED WITH EITHER THE INSTITUTIONS CALENDAR OR PERSONAL CALENDAR
        """
        data["calendar"] = Calendar.objects.get(id=data.get("cal_id")).id
        """
        TEST
        """
        # Create Event
        event_serializer = EventSerializer(data=data)
        event_serializer.is_valid(raise_exception=True)
        event = event_serializer.save()
        # Hold extra data for that event needs for React Big calendar, that is not included in django-scheduler
        additional_serializer = AdditionalEventInfoSerializer(
            data={"event": event.id, "allDay": data.get("allDay")}
        )
        additional_serializer.is_valid(raise_exception=True)
        additional_serializer.save()
        return Response(event_serializer.data, status=status.HTTP_201_CREATED)


def generate_unique_slug(model_class, title):
    """
    django-scheduler models aren't great but i'd rather not touch them/
    This function is here so that the slug field in the Calendar model is unique
    """
    original_slug = slugify(title)
    unique_slug = original_slug
    num = 1
    while model_class.objects.filter(slug=unique_slug).exists():
        unique_slug = "{}-{}".format(original_slug, num)
        num += 1
    return unique_slug


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def create_calendar_view(request):
    data = request.data
    data["slug"] = generate_unique_slug(Calendar, data.get("name"))
    calendar_serializer = CalendarSerializer(data=data)
    calendar_serializer.is_valid(raise_exception=True)
    calendar_instance = calendar_serializer.save()
    add_data = {}
    add_data["calendar"] = calendar_instance.id
    add_data["private"] = request.data.get("private")
    add_serializer = AdditionalCalendarInfoSerializer(data=add_data)
    add_serializer.is_valid(raise_exception=True)
    add_instance = add_serializer.save()
    add_instance.users.add(request.user.id)
    if not data.get("private"):
        for uid in data.get("users"):
            add_instance.users.add(uid)
    add_instance.save()
    return Response(calendar_serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def invite_to_calendar_view(request):
    data = request.data
    try:
        add_info_instance = AdditionalCalendarInfo.objects.get(calendar=data.get("id"))
    except AdditionalCalendarInfo.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if add_info_instance.private:
        return Response(
            "Cannot add collaborators to a private calendar",
            status=status.HTTP_400_BAD_REQUEST,
        )
    for uid in data.get("users"):
        add_info_instance.users.add(uid)
    add_info_instance.save()
    return Response("Users succesfully added", status=status.HTTP_200_OK)


@api_view(["GET"])
# @permission_classes([permissions.IsAuthenticated])
# @authentication_classes([JWTAuthentication])
def get_calendar_events(request):
    # Assuming you're retrieving events for a specific period
    # Retrieve query parameters for start and end dates
    # format: 2024-01-01T00:00:00
    start_date_str = request.query_params.get("start", None)
    end_date_str = request.query_params.get("end", None)

    # Parse the datetime strings to datetime objects
    start_date = parse_datetime(start_date_str) if start_date_str else timezone.now()
    end_date = (
        parse_datetime(end_date_str) if end_date_str else start_date + timedelta(days=7)
    )

    events = Event.objects.all()  # Retrieve events as needed
    # try Events.filter(calendar__additional_info__users=request.user) when users are in, instead of above
    all_occurrences = []

    for event in events:
        # Use get_occurrences to retrieve all occurrences within the period
        occurrences = event.get_occurrences(start=start_date, end=end_date)
        non_cancelled_occurrences = [occ for occ in occurrences if not occ.cancelled]
        all_occurrences.extend(non_cancelled_occurrences)

    # Now all_occurrences contains the correct mix of generated and persisted occurrences
    # Serialize and return this data

    occurence_serializer = OccurrenceSerializer(instance=all_occurrences, many=True)
    return Response(occurence_serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_calendars(request):
    users_calendars_info = AdditionalCalendarInfo.objects.filter(
        users=request.user
    ).prefetch_related("calendar")
    users_calendars = [info.calendar for info in users_calendars_info]
    serializer = CalendarSerializer(instance=users_calendars, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# on move recurring event
"""
Occurences are typlically generated automatically, but sometimes we want to have one
occurence different from the pattern, say a weekly meeting falls on a holiday and needs to be pushed back
We create persistent occurences to override the generated occurrences

The persistent occurences only override the occurences with the same event and time, so we create a cancelled occurence to ovverride the generated occurence and then a new valid occurence at the time that we would like the meeting to take place

This current implementation gives possibility of spam, however since anytime the user of the frontend drags an event around a new entry is made in the db,
"""


class PersistedOccurrenceCreateView(APIView):
    @transaction.atomic
    def post(self, request, format=None):
        # This try block minimizes db space, but sacrifices event history for one time only events
        # if we still want event history for one time only events, remove if not event.rule block
        try:
            event = Event.objects.get(id=request.data.get("event"))
            event.description = (
                event.description
                if not request.data.get("description")
                else request.data.get("description")
            )
            event.title = (
                event.title
                if not request.data.get("title")
                else request.data.get("title")
            )
            event.save()
            event_desc = event.description
            event_title = event.title

            # One time only event
            if not event.rule:
                event.start = request.data.get("start")
                event.end = request.data.get("end")
                event.save()
                return Response("Changes made", status=status.HTTP_200_OK)

        except Event.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # Data for cancelling the original occurrence
        cancel_data = {}
        cancel_data["event"] = request.data["event"]
        cancel_data["cancelled"] = True  # Mark as cancelled
        cancel_data["start"] = request.data.get("cancel_start")
        cancel_data["end"] = request.data.get("cancel_end")
        """
        All previously cancelled occurrences should have the same original start, but only one with that original    start for that event would not be cancelled, that is the one that the user just selected
        If there is no original start passed this must be the first time it is being moved or cancelled
        """
        original_start = parse_datetime(request.data.get("cancel_start"))
        original_end = parse_datetime(request.data.get("cancel_end"))
        print(original_start, original_end)
        prev_occurrence = Occurrence.objects.filter(
            event=event,
            start=original_start,
            end=original_end,
            cancelled=False,
        ).first()

        # The first time we cancel or move the event would not of been persisted in the db
        # Any time after that the event is persisted in the db so we have to account for that
        if prev_occurrence:
            # Update if it already exists and is not cancelled
            prev_occurrence.cancelled = True
            prev_occurrence.save(update_fields=["cancelled"])
            # So that every move maintains the original start time

            original_start = prev_occurrence.original_start
            original_end = prev_occurrence.original_end
        else:
            # If here is reached this is the first time the event occurence is being moved or cancelled
            cancel_data["original_start"] = parse_datetime(
                request.data.get("cancel_start")
            )
            cancel_data["original_end"] = parse_datetime(request.data.get("cancel_end"))
            cancel_serializer = OccurrenceSerializer(data=cancel_data)
            if cancel_serializer.is_valid(raise_exception=True):
                cancel_serializer.save()

            else:
                return Response(
                    cancel_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )

        # Data for the new occurrence
        new_occurrence_data = {}
        new_occurrence_data["event"] = request.data.get("event")

        """ 
        occurence_data still needs start and end time data, as well at original start and original end
        original_start and original_end, should be the original_start and end of the cancel_instance
        """
        new_occurrence_data["start"] = parse_datetime(request.data.get("start"))
        new_occurrence_data["end"] = parse_datetime(request.data.get("end"))
        new_occurrence_data["original_start"] = original_start
        new_occurrence_data["original_end"] = original_end
        new_occurrence_data["title"] = event_title
        new_occurrence_data["description"] = event_desc

        new_occurrence_serializer = OccurrenceSerializer(data=new_occurrence_data)
        if new_occurrence_serializer.is_valid(raise_exception=True):
            new_occurrence_serializer.save()
        else:
            return Response(
                new_occurrence_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"message": "Occurrence updated successfully"}, status=status.HTTP_200_OK
        )
