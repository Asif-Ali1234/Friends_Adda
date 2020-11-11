import time
import random

from django.http import HttpResponse
from django.http.response import JsonResponse
from django.shortcuts import redirect, render

from .models import userqa, crctanswers, visitors


# Create your views here.
def index(request):
    return render(request, 'index.html')


def create(request):
    if request.method == "POST":
        name = request.POST["usrname"]
        email = request.POST["email"]

        question1 = request.POST["question1"]
        question2 = request.POST["question2"]
        question3 = request.POST["question3"]
        question4 = request.POST["question4"]
        question5 = request.POST["question5"]
        question6 = request.POST["question6"]
        question7 = request.POST["question7"]
        question8 = request.POST["question8"]
        question9 = request.POST["question9"]
        question10 = request.POST["question10"]
        answer1 = request.POST["answer1"]
        answer2 = request.POST["answer2"]
        answer3 = request.POST["answer3"]
        answer4 = request.POST["answer4"]
        answer5 = request.POST["answer5"]
        answer6 = request.POST["answer6"]
        answer7 = request.POST["answer7"]
        answer8 = request.POST["answer8"]
        answer9 = request.POST["answer9"]
        answer10 = request.POST["answer10"]
        qa = userqa.objects.create(name=name, username=email,
                                   question1 = question1 ,question2 = question2,question3 = question3,question4 = question4 , question5 = question5 , question6 = question6 , question7 = question7 , question8 = question8 , question9 = question9 , question10 = question10,
                                    answer1 = answer1 , answer2 = answer2 , answer3 = answer3 , answer4 = answer4 , answer5 = answer5 , answer6 = answer6 , answer7 = answer7 , answer8 = answer8 , answer9 = answer9 , answer10  = answer10)
                                   #question10=question10, answer10=answer10)
        qa.save()
        crct = crctanswers.objects.create(email=qa,
                                           crctans1 = answer1.split('$#%')[-1],crctans2 = answer2.split('$#%')[-1],
                                           crctans3 = answer3.split('$#%')[-1],crctans4 = answer4.split('$#%')[-1],crctans5 = answer5.split('$#%')[-1],crctans6 = answer6.split('$#%')[-1],crctans7 = answer7.split('$#%')[-1],crctans8 = answer8.split('$#%')[-1],crctans9 = answer9.split('$#%')[-1],crctans10 = answer10.split('$#%')[-1])
                                           #crctans10=answer10.split('$#%')[-1])
        crct.save()
        data = {
            'url': 'https://friendsadda.pythonanywhere.com/how_much_you_know_about/name=/'+str(name)+'/mail=/'+str(email)
        }
        return JsonResponse(data)
    else:
        return redirect("/")


def display_questions(request):
    if request.method == "POST":
        mail = request.POST['username']
        if userqa.objects.filter(username=mail).exists():
            user = userqa.objects.get(username=mail)
            questions = [user.question1, user.question2, user.question3, user.question4, user.question5,
                         user.question6, user.question7, user.question8, user.question9, user.question10]
            answers = [user.answer1, user.answer2, user.answer3, user.answer4, user.answer5,
                       user.answer6, user.answer7, user.answer8, user.answer9, user.answer10]
            time.sleep(3)
            data = {
                'error': False,
                'questions': questions,
                'answers': answers,
            }
            return JsonResponse(data)
        else:
            time.sleep(1)
            data = {
                'error': True,
                'msg': 'Username does not exist create questions first before fetching'
            }
            return JsonResponse(data)
    else:
        return render(request, 'getquestions.html')


def deleteaccount(request):
    if request.method == "POST":
        mail = request.POST['deleteaccountmail']
        if userqa.objects.filter(username=mail).exists():
            user = userqa.objects.get(username=mail)
            dvalues = user.delete()
            return HttpResponse('User deleted with values '+str(dvalues[0]))
        else:
            return HttpResponse('<h1>User doesnt exixts</h1>')
    else:
        return redirect('/getquestions')


def answerquiz(request, name, email):
    if request.method == "POST":
        user_score = 0
        user = crctanswers.objects.get(email=email)
        qa = userqa.objects.get(username=email)
        visitor_name = request.POST['visitor_name']
        visitor_email = request.POST['visitor_mail']
        try:
            if user.crctans1 == request.POST["answer1"]:
                user_score += 1
            if user.crctans2 == request.POST["answer2"]:
                user_score += 1
            if user.crctans3 == request.POST["answer3"]:
                user_score += 1
            if user.crctans4 == request.POST["answer4"]:
                user_score += 1
            if user.crctans5 == request.POST["answer5"]:
                user_score += 1
            if user.crctans6 == request.POST["answer6"]:
                user_score += 1
            if user.crctans7 == request.POST["answer7"]:
                user_score += 1
            if user.crctans8 == request.POST["answer8"]:
                user_score += 1
            if user.crctans9 == request.POST["answer9"]:
                user_score += 1
            if user.crctans10 == request.POST["answer10"]:
                user_score += 1
            if user_score < 5:
                success_msg = "You need to know more about "+name
                color = "Red"
            elif user_score > 5 and user_score <= 8:
                success_msg = "Your bonding is above average with "+name
                color = "Green"
            elif user_score > 8:
                success_msg = "Your bonding with "+name+" is high"
                color = "Green"
            else:
                success_msg = "Your bonding is average with "+name
                color = "Gray"

            visitor = visitors.objects.create(
                visitor_email=visitor_email, visitor_name=visitor_name, visitor_score=user_score, usermail=qa)

            visitor.save()

            data = {
                'error': False,
                'success_percentage': 'your success percentage is '+str((user_score/10)*100),
                'success_msg': success_msg,
                'color': color,
                'score': user_score,
            }
        except:
            data = {
                'error': True,
                'msg': 'An Exception Occured Please try again',
            }
        return JsonResponse(data)
    else:
        if not userqa.objects.filter(username=email).exists():

            context = {
                'error': True,
                'email': email,
            }

        else:
            user = userqa.objects.get(username=email)
            questions = [user.question1, user.question2, user.question3, user.question4, user.question5,
                         user.question6, user.question7, user.question8, user.question9, user.question10]
            answers = [user.answer1, user.answer2, user.answer3, user.answer4, user.answer5,
                       user.answer6, user.answer7, user.answer8, user.answer9, user.answer10]
            for i in range(len(answers)):
                answers[i] = answers[i].split("$#%")
                random.shuffle(answers[i])
                random.shuffle(answers[i])
                questions[i] = [questions[i], answers[i]]

            context = {
                'error': False,
                'questions': questions,
                'email': email,
            }

        return render(request, 'answerquestions.html', context)


def checkusername(request, diff):
    if diff == "user":
        username = request.GET['usrname']

        if userqa.objects.filter(username=username).exists():
            data = {
                'error': True,
            }
        else:
            data = {
                'error': False,
            }

        return JsonResponse(data)
    elif diff == "visitor":
        username = request.GET['usrname']

        visitor_mail = request.GET['visitorname']

        if visitors.objects.filter(visitor_email=visitor_mail, usermail=username).exists():
            data = {
                'error': True
            }
        else:
            data = {
                'error': False
            }
        return JsonResponse(data)


def getvisitors(request, mail):
    if request.method == 'GET':

        if userqa.objects.filter(username=mail).exists():

            visited_users = visitors.objects.filter(usermail=mail)

            user = userqa.objects.get(username=mail)

            context = {
                'error': False,
                'users': visited_users,
                'url': 'https://friendsadda.pythonanywhere.com/how_much_you_know_about/name=/'+str(user.name)+'/mail=/'+str(mail)
            }
        else:
            context = {
                'error': True,
                'mail': mail,
            }

        return render(request, 'myvisitors.html', context)
