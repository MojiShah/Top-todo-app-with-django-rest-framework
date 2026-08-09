from django.shortcuts import render

# Create your views here.

def index_page(request):
    context = {}
    return render(request,'home/index.html',context)