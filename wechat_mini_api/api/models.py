from django.db import models

# Create your models here.
class UserInfo(models.Model):
    """ 用户信息 """
    uid = models.CharField(verbose_name="ID", max_length=64)
    area_choices = (
        (1, "#19"),
        (2, "#20"),
        (3, "#21"),
        (4, "#22"),
    )

    area = models.IntegerField(verbose_name='网格', choices=area_choices)
    name = models.CharField(verbose_name='姓名', max_length=32)
    avatar = models.FileField(verbose_name='头像',max_length=128, upload_to='bank/%Y/%m/%d')
    create_date = models.DateField(verbose_name='日期', auto_now_add=True)

    face_token = models.CharField(verbose_name="FaceToken", max_length=32)
    score = models.IntegerField(verbose_name='积分', default=0)
