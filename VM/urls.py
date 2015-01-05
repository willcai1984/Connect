# -*- coding: utf-8 -*- 

from django.conf.urls import patterns, include, url
from django.contrib import admin
from VM.views import *

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Connect.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    #url(r'^admin/', include(admin.site.urls)),
    url(r'^vm/login/', vm_login),
    url(r'^vm/connect/$', vm_connect),
    
    
    url(r'^js/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': '/home/will/git/Connect/Temp/js'}
    ),
                       
    url(r'^css/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': '/home/will/git/Connect/Temp/css'}
    ),
)
