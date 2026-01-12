from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    nickname = models.CharField(max_length=100, blank=True, null=True, verbose_name="Никнейм")
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    settings = models.JSONField(verbose_name='Настройки', default=dict, blank=True)

    def __str__(self):
        return self.username
    