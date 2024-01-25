from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from schedule.models import Event, Occurrence, Rule
from .serializers import EventSerializer, OccurrenceSerializer, RuleSerializer
from schedule.periods import Period, OccurrenceReplacer
from datetime import datetime, timedelta
from django.db import transaction


class EventCreateView(APIView):
    @transaction.atomic
    def post(self, request, format=None):
        data = request.data
        if request.data.get("frequency"):
            try:
                rule = Rule.objects.get(frequency=request.data.get("frequency"))
            except Rule.DoesNotExist:
                # Create Rule
                rule_data = {
                    "name": request.data.get("frequency"),
                    "frequency": request.data.get("frequency"),
                }
                rule_serializer = RuleSerializer(data=rule_data)
                rule_serializer.is_valid(raise_exception=True)
                rule = rule_serializer.save()
            data["rule"] = rule.id
        event_serializer = EventSerializer(data=data)
        event_serializer.is_valid(raise_exception=True)
        event = event_serializer.save()
        return Response(event_serializer.data, status=status.HTTP_201_CREATED)


def get_calendar_events(request):
    # Assuming you're retrieving events for a specific period
    start_date = datetime.now()
    end_date = start_date + timedelta(days=7)  # For example, next 7 days

    events = Event.objects.all()  # Retrieve events as needed
    all_occurrences = []

    for event in events:
        period = Period(
            event, start_date, end_date
        )  # Period for which you want occurrences
        persisted_occurrences = event.occurrence_set.all()
        occ_replacer = OccurrenceReplacer(persisted_occurrences)

        for occ in period.occurrences:
            # Replace generated occurrences with persisted ones
            replaced_occurrence = occ_replacer.get_occurrence(occ)
            all_occurrences.append(replaced_occurrence)

    # Now all_occurrences contains the correct mix of generated and persisted occurrences
    # Serialize and return this data
    # ...


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
        # Data for cancelling the original occurrence
        cancel_data = request.data.get("cancel_occurrence")
        cancel_data["event"] = request.data["event_id"]
        cancel_data["cancelled"] = True  # Mark as cancelled
        cancel_data["start"] = request.data.get("cancel_start")
        cancel_data["end"] = request.data.get("cancel_end")

        """
        All previously cancelled occurrences should have the same original start, but only one with that original    start for that event would not be cancelled, that is the one that the user just selected
        If there is no original start passed this must be the first time it is being moved or cancelled
        """
        original_start = request.data.get("original_start") or request.data.get(
            "cancel_start"
        )
        original_end = request.data.get("original_end") or request.data.get(
            "cancel_end"
        )
        prev_occurrence = Occurrence.objects.filter(
            event_id=cancel_data["event"],
            original_start=original_start,
            original_end=original_end,
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
            cancel_data["original_start"] = request.data.get("cancel_start")
            cancel_data["original_end"] = request.data.get("cancel_end")
            cancel_serializer = OccurrenceSerializer(data=cancel_data)
            if cancel_serializer.is_valid(raise_exception=True):
                cancel_serializer.save()
            else:
                return Response(
                    cancel_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )

        # Data for the new occurrence
        new_occurrence_data = request.data.get("new_occurrence")
        new_occurrence_data["event"] = request.data["event_id"]

        """ 
        occurence_data still needs start and end time data, as well at original start and original end
        original_start and original_end, should be the original_start and end of the cancel_instance
        """
        new_occurrence_data["start"] = request.data.get("start")
        new_occurrence_data["end"] = request.data.get("end")
        new_occurrence_data["original_start"] = original_start
        new_occurrence_data["original_end"] = original_end

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
