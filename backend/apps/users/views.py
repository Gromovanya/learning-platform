from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework.response import Response
from .serializers import RegisterSerializer
from . import schema_serializers
from .decorators import set_cookie_refresh_token
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework import viewsets, status, filters

DEBUG = getattr(settings, "DEBUG", True)

@extend_schema(
    tags=['Utility'],
    operation_id='getCSRFTokenCookie',
    request=None,
    description="Принудительно устанавливает куку с CSRF-токеном. Должен быть вызван фронтендом при загрузке.",
    responses={
        status.HTTP_200_OK: schema_serializers.CSRFCookieResponseSerializer,
        status.HTTP_500_INTERNAL_SERVER_ERROR: None
    }
)
@ensure_csrf_cookie
@api_view(['GET'])
def get_csrf_token(request):
    return Response({"detail": "CSRF cookie set"}, status=status.HTTP_200_OK)

class LoginView(TokenObtainPairView):
    """
    Логин пользователя: выдаёт access и refresh токены, сохраняет refresh в HttpOnly куки
    """
    @extend_schema(
        tags=['Auth'],
        operation_id='userLogin',
        description="Логинит пользователя.",
        responses={
            status.HTTP_200_OK: schema_serializers.AuthResponseSerializer,
            status.HTTP_401_UNAUTHORIZED: schema_serializers.SimpleErrorSerializer,
        }
    )
    @set_cookie_refresh_token
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return response
        
class RegisterView(APIView):
    """
    Регистрация пользователя и выдача токенов сразу после создания
    """
    @extend_schema(
        tags=['Auth'],
        operation_id='userRegister',
        request=RegisterSerializer,
        description="Регистрирует пользователя.",
        responses={
            status.HTTP_201_CREATED: schema_serializers.AuthResponseSerializer,
            status.HTTP_400_BAD_REQUEST: schema_serializers.SimpleErrorSerializer,
            status.HTTP_500_INTERNAL_SERVER_ERROR: None
        }
    )
    @set_cookie_refresh_token
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
            return response
        except Exception:
            return Response({'error': 'Error token generation'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class LogoutView(APIView):
    """
    Логаут пользователя: отзывает refresh токен и удаляет куки
    """
    @extend_schema(
        tags=['Auth'],
        operation_id='userLogout',
        request=None,
        description="Удаление сессии, очиска access и добавление refresh токена в blacklist",
        responses={
            status.HTTP_200_OK: None,
            status.HTTP_400_BAD_REQUEST: schema_serializers.SimpleErrorSerializer
        }
    )
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if not refresh_token:
            return Response({'error': 'No refresh token found'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
        except TokenError:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)

        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie(key='refresh')

        return response

class NewAccessTokenView(TokenRefreshView):
    @extend_schema(
        tags=['Auth'],
        operation_id='newAccessToken',
        description="Получает refresh токен, если у того срок действия не кончился, вернёт access токен",
        responses={
            status.HTTP_200_OK: schema_serializers.AuthResponseSerializer,
            status.HTTP_400_BAD_REQUEST: schema_serializers.SimpleErrorSerializer
        }
    )
    @set_cookie_refresh_token
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if refresh_token:
            request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)
        return response
    
class Error500View(APIView):
    def get(self, request, *args, **kwargs):
        return Response(data={'detail': 'test toast window is error on front!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)