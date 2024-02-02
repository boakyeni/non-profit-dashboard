from rest_framework import serializers
from schedule.models import Event, Occurrence, Rule
from .models import AdditionalEventInfo


class EventSerializer(serializers.ModelSerializer):
    allDay = serializers.SerializerMethodField()

    # There are all the editable fields, calendar should take an id as it is a foreign key
    class Meta:
        model = Event
        fields = "__all__"

    def get_allDay(self, obj):
        try:
            return obj.additional_info.allDay
        except AdditionalEventInfo.DoesNotExist:
            return False


class AdditionalEventInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalEventInfo
        fields = "__all__"


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = "__all__"


class OccurrenceSerializer(serializers.ModelSerializer):
    allDay = serializers.SerializerMethodField()
    rule = serializers.SerializerMethodField()

    class Meta:
        model = Occurrence
        fields = "__all__"

    def get_allDay(self, obj):
        try:
            event = Event.objects.get(id=obj.event.id)
            return event.additional_info.allDay
        except AdditionalEventInfo.DoesNotExist:
            return False

    def get_rule(self, obj):
        try:
            event = Event.objects.get(id=obj.event.id)
            return event.rule.frequency if event.rule else None
        except Event.DoesNotExist:
            return False
