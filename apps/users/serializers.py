from django.contrib.auth import get_user_model
from rest_framework import serializers, viewsets, status
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from djoser.serializers import UserCreateSerializer
from .models import Institution

User = get_user_model()


class CreateUserSerializer(UserCreateSerializer):
    institution_admin = serializers.BooleanField(
        default=False, required=False, allow_null=True
    )

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "reference",
            "password",
            "institution_admin",
            "institution",
        ]
        # extra_kwargs = {"password": {"write_only": True}}


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(source="get_full_name")
    phone_number = PhoneNumberField()
    institution_admin = serializers.BooleanField(required=False)

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
            "institution_admin",
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


class TokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField(read_only=True)
    token_class = RefreshToken

    def validate(self, attrs):
        refresh = self.token_class(attrs["refresh"])

        data = {"access": str(refresh.access_token)}
        if settings.SIMPLE_JWT.get("ROTATE_REFRESH_TOKENS"):
            if settings.SIMPLE_JWT.get("BLACKLIST_AFTER_ROTATION"):
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass

            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()

            data["refresh"] = str(refresh)

        return data


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = "__all__"
