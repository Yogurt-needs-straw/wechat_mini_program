#!/usr/bin/env python
# -*- coding:utf-8 -*-
import uuid
import datetime
from rest_framework.serializers import ModelSerializer, Serializer, ListSerializer
from rest_framework import serializers
from rest_framework import exceptions
from rest_framework.utils.serializer_helpers import (
    BindingDict, BoundField, JSONBoundField, NestedBoundField, ReturnDict,
    ReturnList
)

from api import models


class BankListSerializer(ListSerializer):

    @property
    def data(self):
        ret = super(ListSerializer, self).data
        total_count = models.UserInfo.objects.all().count()
        today_count = models.UserInfo.objects.filter(create_date=datetime.datetime.today()).count()

        info = {
            "total_count": total_count,
            "today_count": today_count,
            "data": ret,
        }
        return ReturnDict(info, serializer=self)


class BankListModelSerializer(ModelSerializer):
    area = serializers.CharField(source="get_area_display")

    class Meta:
        list_serializer_class = BankListSerializer
        model = models.UserInfo
        fields = ["id", "name", "area", "avatar"]


class BankCreateModelSerializer(ModelSerializer):
    area_text = serializers.CharField(source="get_area_display", read_only=True)

    class Meta:
        model = models.UserInfo
        # fields = "__all__"
        exclude = ['face_token', "uid", ]

    def validate(self, data):
        uid = str(uuid.uuid4()).replace("-", "_")
        avatar_file_object = data.get('avatar')
        print(avatar_file_object)
        name = data.get('name')
        from utils import ai
        data['face_token'] = ai.register_image(uid, name, avatar_file_object)
        data['uid'] = uid
        return data

class StatisticsListSerializer(serializers.Serializer):
    create_date = serializers.DateField(format="%Y-%m-%d")
    count = serializers.IntegerField()

class ActivityModelListSerializer(ModelSerializer):
    # date = serializers.DateField(format="%Y-%m-%d")
    disabled = serializers.SerializerMethodField()

    class Meta:
        model = models.Activity
        fields = "__all__"

    def get_disabled(self, row):
        today = datetime.date.today()
        if row.date > today:
            return False
        return True


