from django.shortcuts import render
from rest_framework import viewsets
from django.db.models import Count
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Donor
from .serializers import DonorSerializer


class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer


@api_view({"GET"})
def new_donors_count(self):
    start_date = self.get_specific_time_frame_start_date(days=30)
    new_donors = Donor.objects.filter(donation__donation_date__gte=start_date)
    return Response(new_donors.count())

@api_view({"GET"})
def new_donors_percentage(self):
    total_donors = Donor.objects.exclude(pk=self.pk).aggregate(count=Count("id"))[
        "count"
    ]
    if total_donors != 0:
        new_donors_count = self.new_donors_count()
        return (self.new_donors_count / total_donors) * 100
    else:
        return Response(0)


@api_view({"GET"})
def get_new_donors_date(self, start_date, end_date):
    total_donors_before_start = (
        Donor.objects.filter(
            donation__donation_date__gte=start_date,
            donation__donation_date__lte=end_date,
        )
        .distinct()
        .count()
    )
    new_donors = Donor.objects.filter(
        donation__donation_date__gte=start_date,
    )
    if total_donors_before_start > 0:
        new_donors_percentage = (new_donors / total_donors_before_start) * 100
    else:
        new_donors_percentage = 0
    return Response(
        {
            "new_donors_count": new_donors.count(),
            "new_donors_percentage": new_donors_percentage,
        }
    )
