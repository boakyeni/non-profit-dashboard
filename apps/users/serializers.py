from django.contrib.auth import get_user_model
from rest_framework import serializers, viewsets, status
from phonenumber_field.serializerfields import PhoneNumberField

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
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
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def get_first_name(self, obj):
        return obj.first_name.title()

    def get_last_name(self, obj):
        return obj.last_name.title()

    def get_full_name(self, obj):
        return obj.get_full_name

    def to_representation(self, instance):
        representation = super(UserSerializer, self).to_representation(instance)
        if instance.is_superuser:
            representation["admin"] = True
        return representation
<<<<<<< HEAD
=======

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
>>>>>>> 495e7b089ea8ca459df9c1b1b094e302c5033e55
