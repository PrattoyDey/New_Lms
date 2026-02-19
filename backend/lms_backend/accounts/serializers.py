from rest_framework import serializers
from django.contrib.auth.models import Group
from .models import CustomUser, Profile, CustomPermission, GroupPermissionMapping


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=CustomUser.ROLE_CHOICES)

    class Meta:
        model = CustomUser
        fields = ["email", "password", "role"]

    def create(self, validated_data):
        role = validated_data.pop("role")
        user = CustomUser.objects.create_user(**validated_data, role=role)

        # Assign group based on role
        group_name = role.capitalize()
        group = Group.objects.get(name=group_name)
        user.groups.add(group)

        # Create profile
        Profile.objects.create(user=user)

        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["full_name", "bio"]


class UserPermissionSerializer(serializers.Serializer):
    permissions = serializers.ListField(child=serializers.CharField())

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .utils import get_user_permissions


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):  
        data = super().validate(attrs)

        user = self.user
        data["role"] = user.role
        data["permissions"] = get_user_permissions(user)

        return data
