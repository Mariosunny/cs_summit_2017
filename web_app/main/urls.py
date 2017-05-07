from django.conf.urls import url
from . import views

urlpatterns = [

	url(r'^regex/$', views.Regex.as_view(), name='regex'),
]
