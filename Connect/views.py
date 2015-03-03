# -*- coding: utf-8 -*- 

from django.shortcuts import render_to_response
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from Connect import log2std
import sys, re, os, simplejson
def connect_config(request):
    t = get_template('html/Connect/config.html')
    html = t.render(Context({'': ''}))
    # return HttpResponse(html, content_type="application/x-javascript")
    return HttpResponse(html)

def connect_process(request):
    exec_cli_list = ['export PYTHONPATH=$PYTHONPATH:/home/will/git/;'] 
    exec_cli_list.append("nohup /usr/bin/python /home/will/git/AerohiveExpect/connect.py --debug info")
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
            # Add "" for cr command
            exec '''exec_cli_list.append('-cr "'+request.GET['cli_%s']+'"')''' % i
    # stdout part
    stdfile = log2std(request.GET["logfile"])
    exec_cli_list.append("1>" + stdfile + " 2>&1 &")
    exec_cli = ' '.join(exec_cli_list)
    print '''Exec CLI is: ''' + exec_cli
    os.system(exec_cli)
    t = get_template('html/Connect/process.html')
    html = t.render(Context({'stdfile':stdfile, 'logfile':request.GET["logfile"]}))
    # return HttpResponse(html, content_type="application/x-javascript")
    return HttpResponse(html)


def connect_process_longpull(request):
    c_re = re.compile('Connect Part Done|Login Error|Exec Error|Logout timeout Error')
    print "Connect long pull post data is '%s'" % str(request.POST)
    if request.POST.has_key('logfile'):
        logfile = request.POST['logfile']
        # stdout part
        stdfile = request.POST['stdfile']
        # print "Logfile is '%s'" % logfile
        # print "stdfile is '%s'" % stdfile
        with open(logfile) as l_o:
            l_r = re.sub(r'\n', r'</br>', l_o.read())
        with open(stdfile) as s_o:
            s_r = re.sub(r'\n', r'</br>', s_o.read())
        # print "Logfile is '%s'" % l_r
        # print "stdfile is '%s'" % s_r
        '''
        "UnicodeDecodeError: 'utf8' codec can't decode byte...
        unicode the data first
        '''      
        result = {u"log":unicode(l_r, errors='ignore'), u"std":unicode(s_r, errors='ignore')}
        if c_re.search(s_r):
            result[u'is_end'] = u'y'
        else:
            result[u'is_end'] = u'n'
        #print str(result)
        result_json = simplejson.dumps(result)
        # print "Json data is '%s'" % result_json
        return HttpResponse(result_json, content_type='application/javascript')
    else:
        print "JS response has no logfile part"

def connect_success(request):
    render_to_response('html/Connect/success.html', {})
    
def connect_fail(request):
    render_to_response('html/Connect/fail.html', {})
