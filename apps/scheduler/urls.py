from django.urls import path
from . import views

urlpatterns = [
    path("create-event/", views.EventCreateView.as_view(), name="create_event"),
    path("get-events/", views.get_calendar_events, name="get_events"),
    path(
        "edit-event/", views.PersistedOccurrenceCreateView.as_view(), name="edit_event"
    ),
    path("my-calendars/", views.get_calendars),
    path("create-calendar/", views.create_calendar_view),
    path("invite/", views.invite_to_calendar_view),
]
