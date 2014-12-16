from django.shortcuts import render_to_response
import re

def connect_config(request):
    render_to_response('html/Connect/connect.html', {})

def connect_process(request):
    cli_1 = ''
    cli_2 = ''
    cli_3 = ''
    cli_4 = ''
    cli_5 = ''
    if "type" in request.GET:
        type = request.GET["type"]
    if "port" in request.GET:
        port = request.GET["port"]
    if "ip" in request.GET:
        ip = request.GET["ip"]
    if "prompt" in request.GET:
        prompt = request.GET["prompt"]
    if "user" in request.GET:
        user = request.GET["user"]
    if "passwd" in request.GET:
        passwd = request.GET["passwd"]
    if "timeout" in request.GET:
        timeout = request.GET["timeout"]
    if "logfile" in request.GET:
        logfile = request.GET["logfile"]
#    if "cli_1" in request.GET:
#        cli_1 = request.GET["cli_1"]
#    if "cli_2" in request.GET:
#        cli_2 = request.GET["cli_2"]
#    if "cli_3" in request.GET:
#        cli_3 = request.GET["cli_3"]
#    if "cli_4" in request.GET:
#        cli_4 = request.GET["cli_4"]    
#    if "cli_5" in request.GET:
#        cli_5 = request.GET["cli_5"]
    for i in range(1,6):
        if "cli_"+str(i) in request.GET:
            exec '''cli_%s = request.GET["cli_%s"]''' % (i,i)
    exe_cli_header = "python /home/will/git/AerohiveExpect/connect.py "
    exec_ip 
    -i '192.168.1.1' -cr 'user-profile 1%%10' --debug info -l '/tmp/cli.log'"
    
    render_to_response('html/Connect/process.html', {})
    
def connect_success(request):
    render_to_response('html/Connect/success.html', {})
    
def connect_fail(request):
    render_to_response('html/Connect/fail.html', {})
