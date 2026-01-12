from functools import wraps
from rest_framework.response import Response
from django.conf import settings
from .models import User
from .serializers import UserSerializer

DEBUG = getattr(settings, "DEBUG", True)
SIMPLE_JWT = getattr(settings, 'SIMPLE_JWT', None)

def handle_auth_response(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        response = func(self, request, *args, **kwargs)
        
        if not isinstance(response, Response) or response.status_code >= 400:
            return response
        
        refresh_token = response.data.pop('refresh', None)
        if refresh_token:
            response.set_cookie(
                key='refresh', value=refresh_token, path='/',
                httponly=True, secure=not DEBUG, samesite='Lax',
                max_age=int(SIMPLE_JWT.get('REFRESH_TOKEN_LIFETIME').total_seconds())
            )
        
        user: User | None = getattr(response, 'user_obj', None)
        if user:
            response.data['user'] = UserSerializer(user, context={'request': request}).data
        
        return response
    return wrapper