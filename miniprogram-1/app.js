// app.js
App({
  onLaunch() {
    // storage 获取本都存储 登录
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.globalData.userInfo = userInfo;
    }
  },
  globalData: {
    userInfo:null
  },
  initUserInfo: function(name,userId,avatar) {
    var info = {
      name: name,
      userId: userId,
      avatar: avatar
    };
    this.globalData.userInfo = info
    wx.setStorageSync('userInfo', info);
  },
  logoutUserInfo:function(){
    wx.removeStorageSync('userInfo');
    this.globalData.userInfo=null;
  }
})
