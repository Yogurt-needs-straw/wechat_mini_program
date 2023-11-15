// pages/myActivity/myActivity.js
var app = getApp()
const api = require("../../config/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [],
    maxId: 0, //最大ID
    minId: 0
  },

  getDataList() {
    wx.request({
      method: "GET",
      url: api.bankActivity,
      data: {
        user_id:app.globalData.userInfo.uid
      },
      success: (res) => {
        if (res.data.length > 0) {
          this.data.maxId = res.data[0]['id']
          this.data.minId = res.data[res.data.length - 1]['id']
        }

        this.setData({
          activityList: res.data
        })
      },
      complete: () => {
        wx.stopPullDownRefresh() //数据获取到之后
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

  },

  doLoadMore(){
    if(this.data.minId===0){
      this.getDataList()
      return
    }
    this.getReachButtomData()
  },

  getReachButtomData(){

    //1.发送请求，获取 min_id=minId，比这个id更小的数据
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method: "GET",
      url: api.bankActivity,
      data: {
        min_id: this.data.minId,
        user_id:app.globalData.userInfo.uid
      },
      success: (res) => {
        var response = res.data
        if (response.length > 0) {
          this.setData({
            activityList: this.data.activityList.concat(response),
            minId: response[response.length-1].id
          })
        } else {
          wx.showToast({
            title: '已经到底了',
            icon: "none"
          })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  bindExchange:function(e){
    let activityId = e.currentTarget.dataset.aid
    let index = e.currentTarget.dataset.index


    wx.request({
      url: api.bankExchange,
      data:{
        user_id:app.globalData.userInfo.uid,
        activity_id:activityId
      },
      method:"GET",
      success:(res) =>{
        if(!res.data.status){
          wx.showToast({
            title: res.data.error,
            icon: "none"
          })
        }else{
          
          // activityList中  index 位置,  exchange=true
          // 传统：1.读取activityList
          // this.data.activityList[index].exchange=true
          //       var tmp = this.data.activityList;
          //       temp[index].exchange=true
          //        
          // 小程序：


          this.setData({
            ["activityList[" + index + "].exchange"]: true
          })


          wx.showToast({
            title: '兑换成功，您目前的积分为' + res.data.score + "。",
            icon:"none",
            duration:25006
          })
        }
      }
    })

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