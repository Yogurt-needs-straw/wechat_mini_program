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

