from django.urls import path
from demo import views

urlpatterns = [
    path('', views.index, name='index'),
    path('contact/', views.contact, name='contact'),
    path('profile/', views.profile, name='profile'),
]
