from django.http import HttpResponse
from django.shortcuts import render_to_response

def connect_config(request):
    render_to_response('connect.html',{})

def connect_process(request):
    render_to_response('connect.html',{})
    
def connect_success(request):
    render_to_response('connect.html',{})
    
def connect_fail(request):
    render_to_response('connect.html',{})