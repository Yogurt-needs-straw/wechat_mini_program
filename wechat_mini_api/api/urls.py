
from django.urls import re_path

from api.views import bank

urlpatterns = [
    re_path(r'^bank/$', bank.BankView.as_view()),
    re_path(r'^bank/(?P<pk>\d+)/$', bank.BankView.as_view()),
    re_path(r'^bank/statistics/$', bank.StatisticsView.as_view()),
    re_path(r'^bank/face/$', bank.FaceView.as_view()),
    re_path(r'^bank/voice/$', bank.VoiceView.as_view()),
    re_path(r'^bank/activity/$', bank.ActivityView.as_view()),

]
