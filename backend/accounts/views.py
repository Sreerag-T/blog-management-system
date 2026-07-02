from rest_framework import generics, permissions
from django.contrib.auth.models import User

from .serializers import UserSerializer, PublicUserSerializer


class UserCreateView(generics.ListCreateAPIView):
    """
    Admin-only endpoint for creating and listing user accounts.
    Regular users don't self-register - accounts are provisioned by staff,
    matching the "administrator creates users" requirement.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class MeView(generics.RetrieveAPIView):
    """Returns the currently authenticated user's profile."""

    serializer_class = PublicUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
