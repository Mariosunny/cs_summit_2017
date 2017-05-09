from django.conf.urls import url
from . import views

urlpatterns = [

	url(r'^regex/$', views.Regex.as_view(), name='regex'),
	url(r'^results/regex/$', views.results_regex, name='results_regex'),
	url(r'^results/authorship/$', views.results_authorship, name='results_authorship'),
	url(r'^authorship/$', views.Authorship.as_view(), name='authorship'),
	url(r'^planets/$', views.Planets.as_view(), name='planets'),
]
