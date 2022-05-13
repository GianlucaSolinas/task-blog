from django.shortcuts import render
from .models import Post
from rest_framework import generics
from .serializers import PostSerializer
# Create your views here.

class PostCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new Post
    queryset = Post.objects.all(),
    serializer_class = PostSerializer

class PostList(generics.ListAPIView):
    # API endpoint that allows Post to be viewed.
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveAPIView):
    # API endpoint that returns a single Post by pk.
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a Post record to be updated.
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a Post record to be deleted.
    queryset = Post.objects.all()
    serializer_class = PostSerializer