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
	
	title = "Regular Expressions"
	template_name = "regex.html"

def results_authorship(request):

	attempts = request.GET.get('attempts')

	if(len(attempts) > 5000):

		attempts = attempts[0:5000]

	models.CompletedLessonAuthorship.objects.create(
		lesson=create_lesson(request),
		attempts=attempts,
	)

	return HttpResponse("");

def results_regex(request):

	attempts = request.GET.get('attempts')

	if(len(attempts) > 5000):

		attempts = attempts[0:5000]

	models.CompletedLessonRegex.objects.create(
		lesson=create_lesson(request),
		attempts=attempts,
	)

	return HttpResponse("");

def create_lesson(request):

	return models.CompletedLesson.objects.create(
		time = request.GET.get('time'),
		topic = request.GET.get('topic'),
		lesson = request.GET.get('lesson'),
		session = request.GET.get('session'),
	)

class Authorship(View):
	
	title = "Authorship"
	template_name = "authorship/main.html"
