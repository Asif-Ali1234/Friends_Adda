from django.urls import path,include,re_path
from . import views

urlpatterns=[
    path('',views.index,name="index"),
    path('createuserandquestions',views.create,name="create"),
    path('getquestions',views.display_questions,name="display_questions"),
    path('deleteaccount',views.deleteaccount,name="deleteaccount"),
    path('how_much_you_know_about/name=/<str:name>/mail=/<str:email>',views.answerquiz,name="answerquiz"),
    path('my_questions_visitors/<str:mail>',views.getvisitors,name="getvisitors"),
    path('checkusername/<str:diff>',views.checkusername,name="checkusername"),
]