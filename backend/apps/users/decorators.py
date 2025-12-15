from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken


DEBUG = getattr(settings, "DEBUG", True)

def set_cookie_refresh_token(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        response = func(*args, **kwargs)
        if not isinstance(response, Response) or 'refresh' not in response.data:
            return response

        refresh = response.data.pop('refresh', None)
        if not refresh:
            return Response({'error': 'refresh token is missing'}, status=status.HTTP_400_BAD_REQUEST)
        
        response.data['access'] = str(RefreshToken(refresh).access_token)
        response.set_cookie(
            key='refresh', value=refresh, path='/',
            httponly=True, secure=not DEBUG, samesite='Lax'
        )
        return response
    return wrapper