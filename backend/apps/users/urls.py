from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    # Api auth
    path('login/', views.LoginView.as_view(), name='login'),
    path('ticket/', views.GetWSTicketView.as_view(), name='ticket'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('refresh/', views.NewAccessTokenView.as_view(), name='refresh'),
]
