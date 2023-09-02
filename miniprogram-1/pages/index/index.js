// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataDict:{
      data:[
        {
          "id":45,
          "name":"xxx",
          "area":"#1",
          "avatar":"https://www.baidu.com"
        }
      ],
      today_count:10,
      total_count:100,
    }
  },

  refresh(){
    // 1.发送网络请求
    // 2.数据绑定
    wx.showLoading({
      mask: true,
    })
    wx.request({
      url: "https:localhost/api/bank/", 
      method:"GET",
      success:(res)=>{
        this.setData({
          dataDict:res.data
        })
      },
      complete(){
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 发送网络请求..
      this.refresh();
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
    this.refresh();
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