from django import views
from django.shortcuts import render
from .models import Post
from rest_framework import generics
from .serializers import PostSerializer
# Create your views here.

class PostCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new Post
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostList(generics.ListAPIView):
    # API endpoint that allows Post to be viewed.
    queryset = Post.objects.all().order_by('-created_at').select_related('author')
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveAPIView):
    # API endpoint that returns a single Post by slug.
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'
    def retrieve(self, request, *args, **kwargs):
        if request.GET.get('view') == 'true':
            obj = self.get_object()
            obj.views += 1
            obj.save(update_fields=['views'])
            return super().retrieve(request, *args, **kwargs)
        else:
            return super().retrieve(request, *args, **kwargs)

class PostUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a Post record to be updated.
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a Post record to be deleted.
    queryset = Post.objects.all()
    serializer_class = PostSerializer