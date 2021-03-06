# -*- coding: utf-8 -*- 

from django.conf.urls import patterns, include, url
from django.contrib import admin
from Connect.views import connect_config, connect_process, connect_process_longpull, connect_success, connect_fail
from VM.views import vm_manage, vm_connect, vm_refrash, vm_power, vm_del
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Connect.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^connect/config/', connect_config),
    url(r'^connect/process/$', connect_process),
    url(r'^connect/process/longpull/$', connect_process_longpull),
    url(r'^connect/success/', connect_success),
    url(r'^connect/fail/', connect_fail),
    url(r'^vm/manage/$', vm_manage),
    url(r'^vm/connect/$', vm_connect),
    url(r'^vm/refrash/$', vm_refrash),
    url(r'^vm/power/$', vm_power),
    url(r'^vm/del/$', vm_del),
    url(r'^js/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': '/home/will/git/Connect/Temp/js'}
    ),
                       
    url(r'^css/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': '/home/will/git/Connect/Temp/css'}
    ),
    #for html framework
    #<frame src="vmware_top.html" name="topFrame" 
    #url is http://10.155.39.227:8001/vm/login/vmware_top.html                 
    url(r'^vm/login/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': '/home/will/git/Connect/Temp/html/VM'}
    ),
)
