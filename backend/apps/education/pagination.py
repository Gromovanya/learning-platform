from rest_framework.pagination import CursorPagination


class SessionCursorPagination(CursorPagination):
    page_size = 15
    ordering = ('-created_at', '-id')
    cursor_query_param = 'cursor'