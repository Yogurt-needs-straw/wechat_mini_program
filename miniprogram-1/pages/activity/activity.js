// pages/activity/activity.js
const api = require("../../config/api.js")

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
    ],
    maxId:0, // 最大的ID
    minId:0, // 最小的ID
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

  getDataList(){
    wx.request({
      method:"GET",
      url: api.bankActivity,
      data:{},
      success:(res) => {
        if (res.data.length > 0){
          this.data.maxId = res.data[0]['id']
          this.data.minId = res.data[res.data.length-1]['id']
        }
        
        this.setData({
          activityList:res.data
        })
      },
      complete:()=>{
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getDataList()
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
    if(this.data.maxId === 0){
      this.getDataList()
      return
    }

    wx.showLoading({
      title: '加载中',
    })

    // 获取最新数据
    // 1.获取哪些数据？
    // console.log(this.data.maxId)

    // 发送网络请求，获取社区活动
    wx.request({
      method:"GET",
      url: api.bankActivity,
      data:{max_id:this.data.maxId},
      success:(res) => {
        var response = res.data
        if(response.length > 0){
          this.setData({
            activityList:response.concat(this.data.activityListList),
            maxId:response[0].id
          })
        }else{
          wx.showToast({
            title:'没有新数据了',
            icon:"none"
          })
        }
      },
      complete:()=>{
        wx.hideLoading()
      }
    })

  },

  doLoadMore(){
    if(this.data.minId === 0){
      this.getDataList()
      return 
    }
    this.getReachButtomData()
  },

  getReachButtomData(){
    // 1.发送请求，获取 min_id 比这个id更小的数据
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method:"GET",
      url: api.bankActivity,
      data:{min_id:this.data.minId},
      success:(res) => {
        var response = res.data
        if(response.length > 0){
          this.setData({
            activityList:this.data.activityList.concat(response),
            minId:response[response.length-1].id
          })
        }else{
          wx.showToast({
            title:'已经到底了',
            icon:"none"
          })
        }
      },
      complete:()=>{
        wx.stopPullDownRefresh()
        wx.hideLoading()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    // 1.发送请求，获取 min_id 比这个id更小的数据
    this.getReachButtomData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})