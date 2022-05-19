from http import client
import json
import unittest
from django.forms import model_to_dict
from django.test import Client
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from ..models import Post

class PostTest(unittest.TestCase):
    client = Client()
    user = User.objects.get_or_create(username='test_user')[0]
    client.force_login(user)
    token = Token.objects.get(user_id=user.id)

    def test_posts(self):
        response = self.client.get('/posts/')
        self.assertEqual(response.status_code, 200)

    def test_create_post(self):
        test_post = {
            'title': 'test post',
            'slug': 'test-post',
            'content': 'test content',
            'author_id': self.user.id
        }

        response = self.client.post('/posts/create/', data=test_post, content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_edit_post(self):
        first_post = Post.objects.first()
        response = self.client.put(f'/posts/update/{first_post.id}/', data={'title': 'edit', 'slug': 'edit', 'content': 'edit'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_delete_post(self):
        first_post = Post.objects.first()
        response = self.client.delete(f'/posts/delete/{first_post.id}/', content_type='application/json')
        self.assertEqual(response.status_code, 204)

