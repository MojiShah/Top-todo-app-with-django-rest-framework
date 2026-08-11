from .serializers import TodoSerializer
from .models import Todo
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_all_todos(request:Request):
    todos = Todo.objects.order_by('priority').all()
    todo_serializer = TodoSerializer(todos,many=True)
    return Response(todo_serializer.data,status.HTTP_200_OK)

