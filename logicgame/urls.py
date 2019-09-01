from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('beginner/', views.beginner, name='beginner'),
    path('advanced/', views.advanced, name='advanced'),
    path('<str:gameName>/rankInput', views.rankInput, name='rankInput'),
    path('<str:gameName>/rankDisplay', views.rankDisplay, name='rankDisplay'),
    path('<str:gameName>', views.startGame, name='startGame'),
]