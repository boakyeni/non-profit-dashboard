from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .models import Donor
from .serializers import DonorSerializer

# Create your views here.

@api_view(["GET", "POST"])
def donor_detail(request, pk=None):
  if request.method == "GET":
    if pk is not None:
      try:
        donor = Donor.objects.get(pk=pk)
        serializer = DonorSerializer(donor)
        return Response(serializer.data)
      except donor.Does.NotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    else:
      donors = Donor.objects.all()
      serializer = DonorSerializer(donors, many=True)
      return Response(serializer.data)
      """
    returns all data if primary key is not provided and
    returns all data if primary key is provided. Returns
    404 if primary key is not found
    """