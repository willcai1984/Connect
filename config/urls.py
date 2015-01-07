# -*- coding: utf-8 -*- 

from django.conf.urls import patterns, include, url
from django.contrib import admin
from Connect.views import connect_config, connect_process, connect_process_longpull, connect_success, connect_fail
from VM.views import vm_login, vm_connect
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
    url(r'^vm/login/$', vm_login),

    url(r'^vm/login/$', vm_login),
    url(r'^vm/connect/$', vm_connect),
    
    url(r'^js/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': '/home/will/git/Connect/Temp/js'}
    ),
                       
    url(r'^css/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': '/home/will/git/Connect/Temp/css'}
    ),
    #for html framework                  
    url(r'^vm/login/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': '/home/will/git/Connect/Temp/html/VM'}
    ),
)
