from rest_framework import serializers
from schedule.models import Event, Occurrence, Rule


class EventSerializer(serializers.ModelSerializer):
    # There are all the editable fields, calendar should take an id as it is a foreign key
    class Meta:
        model = Event
        fields = "__all__"


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = "__all__"


class OccurrenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occurrence
        fields = ["id", "event", "title", "start", "end", "description", "cancelled"]
