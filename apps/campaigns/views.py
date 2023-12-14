from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import MonetaryCampaign, Patient, Donation, Cause
from .serializers import MonetaryCampaignSerializer, PatientSerializer, CampaignDonorSerializer, DonationSerializer, CauseSerializer


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = MonetaryCampaign.objects.all()
    serializer_class = MonetaryCampaignSerializer


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())

        name = request.query_params.get('name')
        hospital = request.query_params.get('hospital')
        illness = request.query_params.get('illness')

        if name:
            queryset = queryset.filter(name__icontains=name)
        if hospital:
            queryset = queryset.filter(hospital=hospital)
        if illness:
            queryset = queryset.filter(illness__icontains=illness)

        serializer = self.get_serializer(instance=queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = CampaignDonorSerializer

class CampaignCauseViewSet(viewsets.ModelViewSet):
    queryset = Cause.objects.all()
    serializer_class=CauseSerializer