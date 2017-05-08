from django.db import models


class CompletedLesson(models.Model):

	time = models.IntegerField()
	topic = models.IntegerField()
	lesson = models.IntegerField()
	session = models.CharField(max_length=50)


class CompletedLessonRegex(models.Model):

	lesson = models.ForeignKey(CompletedLesson)
	attempts = models.TextField()


class CompletedLessonAuthorship(models.Model):

	lesson = models.ForeignKey(CompletedLesson)
	attempts = models.TextField()