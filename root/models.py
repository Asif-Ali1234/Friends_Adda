
from django.db import models
from django.db.models.constraints import UniqueConstraint

# Create your models here.

class userqa(models.Model):
    name = models.CharField(max_length=255,unique=False,null=False)
    username=models.CharField(max_length=255,null=False,primary_key=True)
    question1=models.CharField(max_length=1024,null=True,unique=False)
    question2=models.CharField(max_length=1024,null=True,unique=False)
    question3=models.CharField(max_length=1024,null=True,unique=False)
    question4=models.CharField(max_length=1024,null=True,unique=False)
    question5=models.CharField(max_length=1024,null=True,unique=False)
    question6=models.CharField(max_length=1024,null=True,unique=False)
    question7=models.CharField(max_length=1024,null=True,unique=False)
    question8=models.CharField(max_length=1024,null=True,unique=False)
    question9=models.CharField(max_length=1024,null=True,unique=False)
    question10=models.CharField(max_length=1024,null=True,unique=False)
    answer1=models.CharField(max_length=1024,null=True,unique=False)
    answer2=models.CharField(max_length=1024,null=True,unique=False)
    answer3=models.CharField(max_length=1024,null=True,unique=False)
    answer4=models.CharField(max_length=1024,null=True,unique=False)
    answer5=models.CharField(max_length=1024,null=True,unique=False)
    answer6=models.CharField(max_length=1024,null=True,unique=False)
    answer7=models.CharField(max_length=1024,null=True,unique=False)
    answer8=models.CharField(max_length=1024,null=True,unique=False)
    answer9=models.CharField(max_length=1024,null=True,unique=False)
    answer10=models.CharField(max_length=1024,null=True,unique=False)


class crctanswers(models.Model):
    email  = models.OneToOneField(userqa,on_delete=models.CASCADE,primary_key=True)
    crctans1 = models.CharField(max_length=1024,null=False)
    crctans2 = models.CharField(max_length=1024,null=False)
    crctans3 = models.CharField(max_length=1024,null=False)
    crctans4 = models.CharField(max_length=1024,null=False)
    crctans5 = models.CharField(max_length=1024,null=False)
    crctans6 = models.CharField(max_length=1024,null=False)
    crctans7 = models.CharField(max_length=1024,null=False)
    crctans8 = models.CharField(max_length=1024,null=False)
    crctans9 = models.CharField(max_length=1024,null=False)
    crctans10 = models.CharField(max_length=1024,null=False)

class visitors(models.Model):
    visitor_email = models.CharField(max_length = 1024,null=False)
    visitor_name = models.CharField(max_length = 1024,unique=False,null=False)
    visitor_score = models.CharField(max_length=1,unique = False,null=False)
    usermail = models.ForeignKey(userqa,on_delete=models.CASCADE)
