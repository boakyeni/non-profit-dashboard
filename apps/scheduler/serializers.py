from rest_framework import serializers
from schedule.models import Event, Rule

class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = "__all__"

class RuleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Rule
    fields = "__all__"