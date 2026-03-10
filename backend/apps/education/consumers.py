from urllib.parse import parse_qs
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from ..users.models import User
from django.contrib.auth.models import AnonymousUser
from django.core.cache import cache


class SessionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        query_string = self.scope.get('query_string').decode('utf-8')
        query_params = parse_qs(query_string)
        ticket = query_params.get('ticket', [None])[0]

        raw_data: str = await sync_to_async(cache.get)(f"ws_ticket_{ticket}")
        if not raw_data:
            await self.close(code=4003)

        user_id, user_type = raw_data.split(':')
        self.scope['user_id'] = user_id
        self.scope['user_type'] = user_type

        if user_type == 'user':
            self.scope['user'] = await self.get_user(user_id)
        else:
            self.scope['user'] = AnonymousUser()
        await sync_to_async(cache.delete)(f"ws_ticket_{ticket}")
        await self.accept()

    @database_sync_to_async
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

