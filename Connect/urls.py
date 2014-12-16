from django.conf.urls import patterns, include, url
from django.contrib import admin
from Connect.views import connect_config, connect_process, connect_success, connect_fail

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Connect.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^connect/config/', connect_config),
    url(r'^connect/process/', connect_process),
    url(r'^connect/success/', connect_success),
    url(r'^connect/fail/', connect_fail)
)