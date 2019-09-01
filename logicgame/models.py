from django.db import models
from django.utils import timezone

class Rank(models.Model):
    userID = models.CharField(max_length=200)
    score = models.IntegerField(default=0)
    date = models.DateTimeField(default=timezone.now)
    gameName = models.ForeignKey('MyGame', on_delete=models.CASCADE)

    def __str__(self):
        return self.userID

class MyGame(models.Model):
    difficulty = models.IntegerField()
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
