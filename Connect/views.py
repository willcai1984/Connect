from django.shortcuts import render_to_response

def connect_config(request):
    render_to_response('Connect/connect.html',{})

def connect_process(request):
    render_to_response('Connect/process.html',{})
    
def connect_success(request):
    render_to_response('Connect/success.html',{})
    
def connect_fail(request):
    render_to_response('Connect/fail.html',{})