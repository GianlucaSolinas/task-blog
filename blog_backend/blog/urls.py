from django.urls import include, path
from .views import PostCreate, PostList, PostDetail, PostUpdate, PostDelete


urlpatterns = [
    path('create/', PostCreate.as_view(), name='create-Post'),
    path('', PostList.as_view()),
    path('<slug:slug>/', PostDetail.as_view(), name='retrieve-Post'),
    path('update/<int:pk>/', PostUpdate.as_view(), name='update-Post'),
    # path('delete/<int:pk>/', PostDelete.as_view(), name='delete-Post')
]