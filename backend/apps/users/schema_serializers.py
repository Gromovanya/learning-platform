from rest_framework import serializers


class CSRFCookieResponseSerializer(serializers.Serializer):
    """Описывает структуру JSON-ответа, возвращаемого после установки CSRF-куки."""
    detail = serializers.CharField(
        max_length=50,
        help_text='Сообщение подтверждения'
    )

class SimpleErrorSerializer(serializers.Serializer):
    """Стандартизированный сериализатор для ошибок (400, 401 и т.д.)."""
    error = serializers.CharField(
        help_text="Сообщение, объясняющее причину ошибки.",
        max_length=255
    )

class AuthResponseSerializer(serializers.Serializer):
    """Описывает структуру JSON-ответа. Хранит access токен, для доступа пользователя"""
    access = serializers.CharField(
        max_length=100,
        help_text='Токен доступа пользователя'
    )
    