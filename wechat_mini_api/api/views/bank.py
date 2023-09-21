#!/usr/bin/env python
# -*- coding:utf-8 -*-
import datetime
from django.db.models import Count, F
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework import status
from rest_framework.filters import BaseFilterBackend

from api import models
from api.serializers.bank import BankCreateModelSerializer, BankListModelSerializer, StatisticsListSerializer
from rest_framework.pagination import LimitOffsetPagination

class BankView(ListAPIView, CreateAPIView, DestroyAPIView):
    queryset = models.UserInfo.objects.all().order_by("-id")

    def get_serializer_class(self):
        if self.request.method == "POST":
            return BankCreateModelSerializer
        return BankListModelSerializer

    def delete(self, request, *args, **kwargs):
        user_object = self.get_object()
        from utils import ai
        ai.delete(user_object.uid, user_object.face_token)
        response = super().delete(request, *args, **kwargs)
        return response


class StatisticsView(ListAPIView):
    queryset = models.UserInfo.objects.values('create_date').annotate(count=Count('create_date')).order_by(
        "-create_date")
    serializer_class = StatisticsListSerializer


