import unittest
from django.test import Client
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class AuthTest(unittest.TestCase):
    client = Client()
    client.force_login(User.objects.get_or_create(username='test_user')[0])

    def test_users(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)

    def test_single_user(self):
        first_user = User.objects.first()
        response = self.client.get(f'/users/{first_user.id}/')
        self.assertEqual(response.status_code, 200)

    def test_token_auth(self):
        response = self.client.post('/api-token-auth/', { 'username': 'test_user', 'password': 'test_password'})
        self.assertEqual(response.status_code, 200)

    def test_current_user(self):
        token = Token.objects.first()
        header = { 'Authorization': f'Token {token}'}
        response = self.client.get('/current-user/', **header)
        self.assertEqual(response.status_code, 200)