from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/session/<int:session_id>/', consumers.SessionConsumer.as_asgi())
]
