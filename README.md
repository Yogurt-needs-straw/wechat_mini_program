# 微信小程序

目标：智慧社区demo



## 1.小程序概述

微信小程序 

HTML (wxml)

CSS（wxss）

javascript（js）



本地开发环境

- 开发者工具
- API



线上环境

- 开发者工具 -> 提交微信（体验，发布）
- API部署线上环境

环境搭建

> 开发时：微信开发者工具设置，不校验合法域名、web-view(业务域名)、TLS版本及https证书

- 下载开发者工具
- 注册小程序（ID）
- 开发
- django + drf

> 微信开发工具 IDE配置
>
> project.config.json
>
> project.private.config.json
>
> sitemap.json

- 微信小程序标签

```bash
text\span
view\div
image\img
icon
navigator\a
```

> 微信小程序 数据展示和绑定
>
> 通过setData绑定添加列表项

```js
changeName(){
    var info = this.data.nameList;
    info.push("alex")
    console.log(info);
    
    this.setData({
        nameList:info
    });
}
```

微信API

样式相关

- 像素 rpx(750rpx)
- 布局 flex
- 更多 icon（fontawesome）
  - TTF > base64
  - 引入项目
  - https://cloud.tencent.com/developer/article/1969962



**tarBar  底部菜单栏**

- position

- list
  - pagePath
  - text
  - iconPath
  - selectedIconPath 选中图标



## 2.智慧社区DEMO

### 2.1 菜单页

### 2.2 采集列表

- 后端：正常API + 简易版API

### 2.3 问题：数据分页

​	使用页面触底事件的处理函数，实现分页

```js
- 小程序
/**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
	// 加载数据
    // 1.获取上次的最新的ID
    // 2.后端发送请求 lastid = 10
    // 3.push
    // 4.最后ID更新
  },
- 后端API (drf) 
	- 页面：/api/bank/?page=10&size=20
    - limit:LimitOffsetPagination
	- id > lastid + 10条
```

### 2.4 人脸监测

- 人员信息录入
- 录入信息比对（AI）



### 2.5 语音识别

- 页面
- 录音
- 发送后端API（文件）+ 识别



### 2.6 社区活动

- 后台管理：发布活动
- 小程序：查看活动 + 报名（必须登录、未登录、则跳转到登录页面）

- 报名活动
- 活动列表（按钮是否可点击）

- 分页 limit:LimitOffsetPagination





### 供应链系统

#### 1. 回顾

- 环境搭建
- 文件
  - 全局
  - 局部页面
  - 页面
  - API

#### 2.智慧社区DEMO

##### 2.1 社区活动

2.1.1 列表展示

2.1.2 下拉刷新

2.1.3 底部翻页

- 初始页面加载
- 上拉
- 下拉

原始LimitOffset分页 + ID(搜索)

123

