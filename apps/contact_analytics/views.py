from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .models import Contact
from .serializers import ContactSerializer


@api_view(["GET"])
def get_all_contacts(request):
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_contact_detail(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
        serializer = ContactSerializer(contact)
        return Response(serializer.data)
    except Contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def create_contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ContactSerializer(contact, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    contact.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
