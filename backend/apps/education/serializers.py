from rest_framework import serializers
from ..users.serializers import AuthorSerializer
from .models import Session
from drf_spectacular.utils import extend_schema_field


class SessionSerializer(serializers.ModelSerializer):
    do = serializers.CharField
    is_member = serializers.SerializerMethodField()
    author = AuthorSerializer(read_only=True)
    participants_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Session
        fields = ['id', 'title', 'description', 'author', 'is_private', 'created_at', 'participants_count', 'is_member']
        read_only_fields = ['id', 'created_at', 'author']

    @extend_schema_field(serializers.BooleanField())
    def get_is_member(self, obj):
        user = self.context['request'].user

        if user.is_authenticated:
            return obj.participants.filter(user=user).exists()
        return False