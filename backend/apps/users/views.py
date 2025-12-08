from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from .serializers import RegisterSerializer
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework import viewsets, status, filters

DEBUG = getattr(settings, "DEBUG", True)

@ensure_csrf_cookie
@api_view(['GET'])
def get_csrf_token(request):
    return Response({"detail": "CSRF cookie set"})

def set_cookie_tokens(response: Response):
    tokens = {
            'access': response.data.get('access', None),
            'refresh': response.data.pop('refresh', None)
        }

    if not tokens.get('access') or not tokens.get('refresh'):
        return Response({'error': 'access or refresh token is missing'}, status=status.HTTP_400_BAD_REQUEST)
    
    response.set_cookie(
        key='refresh', value=tokens.get('refresh'), path='/',
        httponly=True, secure=not DEBUG, samesite='Lax'
    )
    return response

class LoginView(TokenObtainPairView):
    """
    Логин пользователя: выдаёт access и refresh токены, сохраняет их в HttpOnly куки
    """
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return set_cookie_tokens(response)
        
class RegisterView(APIView):
    """
    Регистрация пользователя и выдача токенов сразу после создания
    """
    
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        try:
            refresh = RefreshToken.for_user(user=user)
            response = Response(
                {'access': str(refresh.access_token), 'refresh': str(refresh)},
                status=status.HTTP_201_CREATED
            )
            return set_cookie_tokens(response)
        except Exception:
            return Response({'error': 'Error token generation'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class LogoutView(APIView):
    """
    Логаут пользователя: отзывает refresh токен и удаляет куки
    """
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if not refresh_token:
            return Response({'error': 'No refresh token found'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
        except TokenError:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)

        response = Response({'logout': True}, status=status.HTTP_200_OK)
        response.delete_cookie(key='refresh')

        return response

class NewAccessTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return set_cookie_tokens(response)