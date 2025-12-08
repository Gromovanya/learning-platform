from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class AuthAPITestCase(APITestCase):
    
    def setUp(self):
        self.user_data = {'username': 'akta', 'password': '!@#dfcsq1sadf'}
        self.user = User.objects.create_user(
            username=self.user_data.get('username'),
            password=self.user_data.get('password')
        )

    def test_register_user(self):
        """
        Цель: регистрация нового пользователя через /api/register/.
        Ожидается: 201 Created.
        """
        new_pass = make_password(password='!@#dfcsq1sadf', salt=None, hasher='default')
        print(new_pass)
        print(self.user.password)
        data = {'username': 'usa', 'password': '!@#FDavfdhdc', 'email': 'new@gmail.ru'}
        response = self.client.post('/api/register/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_and_logout_user(self):
        """
        Цель: проверка существующего пользователя через /api/login/.
        Ожидается: 200 OK.
        """
        response = self.client.post('/api/login/', self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.post('/api/logout/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)