from rest_framework import viewsets
from .models import Session
from .serializers import SessionSerializer
from .pagination import SessionCursorPagination
from .permission import IsAuthorOrReadOnly, IsParticipantSession


class SessionViewSet(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    pagination_class = SessionCursorPagination
    permission_classes = [IsAuthorOrReadOnly, IsParticipantSession]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        is_private = self.request.query_params.get('is_private')
        qs_sessions = Session.objects.select_related('author').all()
        if is_private is None:
            return qs_sessions
        elif is_private.lower() == 'true':
            return qs_sessions.filter(is_private=True)
        elif is_private.lower() == 'false':
            return qs_sessions.filter(is_private=False)