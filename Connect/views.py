from django.shortcuts import render_to_response
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
import re, os, simplejson
def connect_config(request):
    t = get_template('html/Connect/config.html')
    html = t.render(Context({'': ''}))
    return HttpResponse(html, mimetype="application/x-javascript")

def connect_process(request):
    exec_cli_list = ["nohup python /home/will/git/AerohiveExpect/connect.py --debug info"]
    if "type" in request.GET:
        exec_cli_list.append("-m '%s'" % request.GET["type"])
    if "port" in request.GET:
        exec_cli_list.append("--port '%s'" % request.GET["port"])
    if "ip" in request.GET:
        exec_cli_list.append("-i '%s'" % request.GET["ip"])
    if "prompt" in request.GET:
        exec_cli_list.append("--prompt '%s'" % request.GET["prompt"])
    if "user" in request.GET:
        exec_cli_list.append("-u '%s'" % request.GET["user"])
    if "passwd" in request.GET:
        exec_cli_list.append("-p '%s'" % request.GET["passwd"])
    if "timeout" in request.GET:
        exec_cli_list.append("-t '%s'" % request.GET["timeout"])
    if "logfile" in request.GET:
        exec_cli_list.append("-l '%s'" % request.GET["logfile"])
    for i in range(1, 6):
        if "cli_" + str(i) in request.GET:
            exec '''exec_cli_list.append("-cr "+request.GET["cli_%s"])''' % i
    #stdout part
    stdfile = log2std(request.GET["logfile"])
    exec_cli_list.append("1>" + stdfile + " 2>&1 &")
    exec_cli = ' '.join(exec_cli_list)
    os.system(exec_cli)
    render_to_response('html/Connect/process.html', {'stdfile':stdfile, 'logfile':request.GET["logfile"]})

def connect_process_longpull(request):
    if request.has_key('logfile'):
        logfile = request.POST['logfile']
    #stdout part
    stdfile = log2std(logfile)
    with open(logfile) as l_o:
        l_r = l_o.read()
    with open(stdfile) as s_o:
        s_r = s_o.read()
    result = {"log":l_r, "std":s_r}
    result_json = simplejson.dumps(result, ensure_ascii=False)
    return HttpResponse(result_json, mimetype='application/javascript')

def connect_success(request):
    render_to_response('html/Connect/success.html', {})
    
def connect_fail(request):
    render_to_response('html/Connect/fail.html', {})

def log2std(logfile):
    log_dir, log_file = os.path.split(logfile)
    #if null create the folder
    if not os.path.exists(log_dir):
        os.makedirs(log_dir) 
    log_file_name, log_file_suffix = os.path.splitext(log_file)
    stdfile = log_dir + log_file_name + '.std'
    if not os.path.exists(logfile):
        #if null, create the file
        os.system("echo ''>" + logfile)
    if not os.path.exists(stdfile):
        #if null, create the file
        os.system("echo ''>" + stdfile)
    return stdfile
