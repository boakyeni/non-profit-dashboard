from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .models import Donor
from .serializers import DonorSerializer


@api_view(["GET"])
def get_donor_detail(request, pk):
    try:
        donor = Donor.objects.get(pk=pk)
        serializer = DonorSerializer(donor)
        return Response(serializer.data)
    except Donor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def get_all_donors(request):
    donors = Donor.objects.all()
    serializer = DonorSerializer(donors, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_donor(request):
    serializer = DonorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
