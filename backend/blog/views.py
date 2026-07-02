from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError

from .models import Post, Comment
from .permissions import IsOwnerOrReadOnly
from .serializers import PostListSerializer, PostDetailSerializer, CommentSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('author').prefetch_related('comments')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = Comment.objects.select_related('author', 'post')
        post_id = self.request.query_params.get('post')
        if post_id:
            queryset = queryset.filter(post_id=post_id)
        return queryset

    def perform_create(self, serializer):
        post_id = self.request.data.get('post')
        if not post_id:
            raise ValidationError({'post': 'This field is required.'})
        serializer.save(author=self.request.user, post_id=post_id)
