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


class Home(View):
	
	title = "Home"
	template_name = "home.html"


class Regex(View):
	
	title = "Regular Expressions"
	template_name = "regex.html"


class Shapes(View):
	
	title = "Drawing Shapes"
	template_name = "shapes.html"


def results_shapes(request):

	create_lesson(request),

	return HttpResponse("");


def results_graph(request):

	create_lesson(request),

	return HttpResponse("");


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


class Planets(View):
	
	title = "Planetary Motion"
	template_name = "planets.html"


class Graph(View):
	
	title = "Graphing Functions"
	template_name = "graph.html"


class Gravity(View):
	
	title = "Kinematics"
	template_name = "gravity.html"