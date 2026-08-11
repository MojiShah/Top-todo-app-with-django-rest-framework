from django.urls import path
from . import views

urlpatterns=[
    path('',views.index_page),
    path('todos-json-first/',views.todo_json_first)
]