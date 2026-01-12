from rest_framework import serializers
from .serializers import UserSerializer


class SimpleErrorSerializer(serializers.Serializer):
    """Стандартизированный сериализатор для ошибок (400, 401 и т.д.)."""
    error = serializers.CharField(
        help_text="Сообщение, объясняющее причину ошибки.",
        max_length=255
    )

class SimpleDetailSerializer(serializers.Serializer):
    """Стандартизированный сериализатор для подробности об ответе запроса (401, 200 и т.д.)."""
    detail = serializers.CharField(
        help_text="Сообщение, с важной ифнормацией.",
        max_length=255
    )

class AuthResponseSerializer(serializers.Serializer):
    """Описывает структуру JSON-ответа. Хранит access токен, для доступа пользователя"""
    access = serializers.CharField(help_text='JWT access токен')
    user = UserSerializer(read_only=True)
    
    