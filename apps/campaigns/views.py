from rest_framework import viewsets, status, permissions, generics
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import MonetaryCampaign, Patient, Donation, Cause
from .serializers import (
    MonetaryCampaignSerializer,
    PatientSerializer,
    CampaignDonorSerializer,
    DonationSerializer,
    CauseSerializer,
)
from django.db import transaction


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = MonetaryCampaign.objects.all()
    serializer_class = MonetaryCampaignSerializer


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())

        name = request.query_params.get("name")
        hospital = request.query_params.get("hospital")
        illness = request.query_params.get("illness")

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
    serializer_class = CauseSerializer


class GetCauses(generics.ListAPIView):
    serializer_class = CauseSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Cause.objects.all()


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def create_cause(request):
    serializer = CauseSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    cause_instance = serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def edit_cause(request):
    try:
        cause_instance = Cause.objects.get(id=request.data.get("id"))
    except Cause.DoesNotExist:
        return Response({"error": "Cause not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = CauseSerializer(instance=cause_instance, data=request.data)
    serializer.is_valid(raise_exception=True)
    cause_instance = serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)
