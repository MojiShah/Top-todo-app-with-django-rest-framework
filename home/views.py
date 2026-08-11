from django.shortcuts import render
from todo.models import Todo
from django.http import HttpRequest,JsonResponse,HttpResponse
# Create your views here.

def index_page(request):
    context = {
        'todos':Todo.objects.order_by('priority').all()
    }
    return render(request,'home/index.html',context)

def todo_json_first(request:HttpRequest):
    todos = list(Todo.objects.order_by('priority').all().values('title','is_done'))
    return JsonResponse({'todos':todos})