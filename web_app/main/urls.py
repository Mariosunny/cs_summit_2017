from django.conf.urls import url
from . import views

urlpatterns = [

	url(r'^$', views.Home.as_view(), name='home'),
	url(r'^regex/$', views.Regex.as_view(), name='regex'),
	url(r'^results/graph/$', views.results_graph, name='results_graph'),
	url(r'^results/shapes/$', views.results_shapes, name='results_shapes'),
	url(r'^results/regex/$', views.results_regex, name='results_regex'),
	url(r'^results/authorship/$', views.results_authorship, name='results_authorship'),
	url(r'^authorship/$', views.Authorship.as_view(), name='authorship'),
	url(r'^planets/$', views.Planets.as_view(), name='planets'),
	url(r'^graph/$', views.Graph.as_view(), name='graph'),
	url(r'^shapes/$', views.Shapes.as_view(), name='shapes'),
	url(r'^gravity/$', views.Gravity.as_view(), name='gravity'),
]
