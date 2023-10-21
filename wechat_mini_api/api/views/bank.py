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
from api.serializers.bank import BankCreateModelSerializer, BankListModelSerializer, StatisticsListSerializer, \
    ActivityModelListSerializer, GoodsListSerializer
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


class FaceView(APIView):
    """
    人脸检测，用户提交图片，后台根据图片进行人脸搜索。
    """

    def post(self, request, *args, **kwargs):
        avatar_object = request.data.get('avatar')
        if not avatar_object:
            return Response({"msg": "未提交图像", "status": False})
        from utils import ai
        result = ai.search(avatar_object)
        return Response({"content": result, "status": True})


class VoiceView(APIView):
    def post(self, request, *args, **kwargs):
        voice_object = request.data.get('voice')
        from utils import ai
        result = ai.speed(voice_object)
        # {'corpus_no': '6847771638436561158', 'result': ['你是不是打过来？'], 'sn': '15921476781594371078', 'err_msg': 'success.', 'err_no': 0}
        return Response(result)

from rest_framework.filters import BaseFilterBackend

class PullDownFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        max_id = request.query_params.get("max_id")
        if max_id:
            queryset = queryset.filter(id__gt=max_id)
        return queryset

class ReachBottomFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        min_id = request.query_params.get("min_id")
        if min_id:
            queryset = queryset.filter(id__lt=min_id)
        return queryset

from rest_framework.pagination import LimitOffsetPagination
class DemoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2

    def get_offset(self, request):
        return 0

    # 重新返回数据格式
    def get_paginated_response(self, data):
        return Response(data)

class ActivityView(ListAPIView):
    queryset = models.Activity.objects.all().order_by('-id')
    serializer_class = ActivityModelListSerializer
    filter_backends = [PullDownFilter, ReachBottomFilter]
    pagination_class = DemoLimitOffsetPagination

    # 重写paginate_queryset方法 使其下拉加载时 全部加载 向下滚动时 分页加载
    def paginate_queryset(self, queryset):
        max_id = self.request.query_params.get("max_id")
        if max_id:
            return
        return super().paginate_queryset(queryset)


class GoodsView(ListAPIView):
    queryset = models.Goods.objects.all().order_by('-id')
    serializer_class = GoodsListSerializer