from django.forms import model_to_dict
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.decorators import api_view

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = User.objects.get(pk=token.user_id)
        return Response({'token': token.key, 'user': model_to_dict(user, fields=['username', 'first_name', 'last_name', 'id', 'is_staff'])})


@api_view(['GET'])
def current_user(request):
    user = request.user
    return Response({
      'username' : user.username,
      'first_name' : user.first_name,
      'last_name' : user.last_name,
      'id' : user.id,
      'is_staff' : user.is_staff,
    })