import api.views as bank
from django.urls import re_path

urlpatterns = [
    re_path('bank/', bank.BankView.as_view()),
    re_path('bank/(?P<pk>\d+)/$', bank.BankView.as_view())
]
