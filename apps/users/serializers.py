from django.contrib.auth import get_user_model
from rest_framework import serializers, viewsets, status
from phonenumber_field.serializerfields import PhoneNumberField

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(source="get_full_name")
    phone_number = PhoneNumberField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "phone_number",
            "reference",
            "calendars",
        ]

    def get_full_name(self, obj):
        return obj.get_full_name

    def to_representation(self, instance):
        representation = super(UserSerializer, self).to_representation(instance)
        if instance.is_superuser:
            representation["admin"] = True
        return representation

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
