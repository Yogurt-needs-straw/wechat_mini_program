// pages/activity/activity.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList:[
      {
        "id": 1,
        "disabled": true,
        "title": "x1",
        "text": "123...",
        "date": "2023-09-27",
        "count": 0,
        "score": 10
    }
    ]
  },

  doApply(nid){
    // 1.判断是否已登录(vuex)
    var userInfo = app.globalData.userInfo;
    
    // 2.未登录，则跳转到登录页面
    if(!userInfo){
      wx.switchTab({
        url:'/pages/mine/mine',
      })
      return
    }

    // 3.已登录，继续请求

    // 对于活动列表（已报名，已过期）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})