from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .models import Contact
from .serializers import ContactSerializer

# Create your views here.


@api_view(["GET", "POST", "PUT", "DELETE"])
def contact_detail(request, pk=None):
    if request.method == "GET":
        if pk is not None:
            try:
                contact = Contact.objects.get(pk=pk)
                serializer = ContactSerializer(contact)
                return Response(serializer.data)
            except contact.Does.NotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            contacts = Contact.objects.all()
            serializer = ContactSerializer(contacts, many=True)
            return Response(serializer.data)
            """
      returns all data if primary key is not provided and
      returns all data if primary key is provided. Returns
      404 if primary key is not found
      """

    elif request.method == "POST":
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        """
    creates a new contact if valid data is provided
    """

    elif request.method == "PUT":
        try:
            contact = Contact.objects.get(pk=pk)
        except Contact.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ContactSerializer(contacts, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        """
    updates an existing contact specified by the pk is provided, 
    if contact is found, updates contact with data from the request payload
    """

    elif request.method == "DELETE":
        try:
            contact = Contact.objects.get(pk=pk)
        except Contact.DoesNotExist:
            return Response(status=status.HTTP_204_NOT_FOUND)

        contact.delete()
        return Response(status=+status.HTTP_204_NO_CONTENT)
        """
    deletes an existing contact specified by the pk if found
    """
