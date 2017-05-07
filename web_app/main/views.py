from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView

from . import models


class View(TemplateView):

	title = None
	template_name = None

	def get_context_data(self, **kwargs):

		return {
			"title": self.title,
		}

class Regex(View):
	
	title = "Regex"
	template_name = "regex.html"
