from django.db import models
from schedule.models import Event, Calendar
from django.contrib.auth import get_user_model
import uuid

# Create your models here.
User = get_user_model()


# React Big Calendar has an allDay field but django-scheduler Event does not
# This way is done instead of extending, cause I don't want to read anymore of
# django schedulers source
class AdditionalEventInfo(models.Model):
    event = models.OneToOneField(
        Event, on_delete=models.CASCADE, related_name="additional_info"
    )

    @property
    def allDay(self):
        start_time = self.event.start.time()
        end_time = self.event.end.time()
        midnight = start_time.replace(hour=0, minute=0, second=0, microsecond=0)
        return start_time == midnight and end_time == midnight


class AdditionalCalendarInfo(models.Model):
    calendar = models.OneToOneField(
        Calendar, on_delete=models.CASCADE, related_name="additional_info"
    )
    private = models.BooleanField(default=False)
    users = models.ManyToManyField(User, blank=True, related_name="calendars")


class Board(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    boardName = models.CharField(max_length=255)


class Card(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    board = models.ForeignKey(Board, related_name="cards", on_delete=models.CASCADE)


class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    card = models.ForeignKey(Card, related_name="tasks", on_delete=models.CASCADE)


class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tagName = models.CharField(max_length=255)
    color = models.CharField(max_length=7)
    card = models.ForeignKey(Card, related_name="tags", on_delete=models.CASCADE)
