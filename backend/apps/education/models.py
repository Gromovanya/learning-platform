from django.db import models
from django.conf import settings

AUTH_USER_MODEL = getattr(settings, 'AUTH_USER_MODEL', None)

class Session(models.Model):
    title = models.CharField(max_length=255, verbose_name="Заголовок сессии")
    description = models.TextField(null=True, blank=True, verbose_name="Описание")
    author = models.ForeignKey(
        AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='sessions'
    )
    is_private = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # Интеллектуальное решение для participants_count (см. ниже)
    @property
    def participants_count(self):
        return self.participants.count()

    def __str__(self):
        return self.title

class Card(models.Model):
    session = models.ForeignKey(
        Session, 
        on_delete=models.CASCADE, 
        related_name='cards'
    )
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    answer = models.TextField(verbose_name="Ответ на карточке")
    is_opened = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} (Session: {self.session.id})"

class MessageCard(models.Model):
    card = models.ForeignKey(
        Card, 
        on_delete=models.CASCADE, 
        related_name='messages'
    )
    author = models.ForeignKey(
        AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='card_messages'
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at'] # Сообщения всегда идут по порядку

    def __str__(self):
        return f"Comment by {self.author.username} on Card {self.card.id}"
    

class Participant(models.Model):
    session = models.ForeignKey(
        Session, 
        on_delete=models.CASCADE, 
        related_name='participants'
    )
    user = models.ForeignKey(
        AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='participated_sessions'
    )
    is_online = models.BooleanField(default=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('session', 'user')

    def __str__(self):
        return f"{self.user.username} in {self.session.title}"