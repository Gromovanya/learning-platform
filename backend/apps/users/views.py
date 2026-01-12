from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from .serializers import RegisterSerializer, MyTokenRefreshSerializer
from . import schema_serializers
from .decorators import handle_auth_response
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework import viewsets, status, filters

class LoginView(APIView):
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
    @handle_auth_response
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'error': 'Неверный логин или пароль'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response(
                {"error": "Аккаунт деактивирован"}, status=status.HTTP_403_FORBIDDEN)
        
        refresh = RefreshToken.for_user(user=user)
        response = Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)
        response.user_obj = user
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
    @handle_auth_response
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
            response.user_obj = user
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
        
        response = Response({'detail': 'Logged out successfully'}, status=status.HTTP_200_OK)
        response.delete_cookie(key='refresh', path='/')
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
        except (TokenError, AttributeError):
            pass

        return response

class NewAccessTokenView(TokenRefreshView):
    serializer_class = MyTokenRefreshSerializer
    @extend_schema(
        tags=['Auth'],
        operation_id='newAccessToken',
        description="Обновляет access токен, используя refresh токен из HttpOnly куки.",
        responses={
            status.HTTP_200_OK: schema_serializers.AuthResponseSerializer,
            status.HTTP_401_UNAUTHORIZED: schema_serializers.SimpleDetailSerializer,
            status.HTTP_400_BAD_REQUEST: schema_serializers.SimpleErrorSerializer
        }
    )
    @handle_auth_response
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if not refresh_token:
            return Response({"detail": "Session expired, please login again"}, status=status.HTTP_401_UNAUTHORIZED)
        
        data = request.data.copy()
        data['refresh'] = refresh_token
            
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        response = Response(serializer.validated_data, status=status.HTTP_200_OK)
        response.user_obj = getattr(serializer, 'user_obj', None)
        return response
    
class Error500View(APIView):
    def get(self, request, *args, **kwargs):
        return Response(data={'detail': 'test toast window is error on front!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)