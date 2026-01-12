from django.urls import path, include
from . import views
from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register('sessions', views.SessionViewSet, basename='sessions')

urlpatterns = [
    path('', include(router.urls))
]
