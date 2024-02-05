from django.db import models
from schedule.models import Event, Calendar

# Create your models here.


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
