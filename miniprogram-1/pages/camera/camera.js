// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 默认前置摄像头
    backFront:true,
  },

  switchCamera(e) {
    var old = this.data.backFront
    this.setData({
      backFront: !old
    })
  },

  takePhoto:function(){
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {    
        // 获取照片 
        //console.log(res);

        // 对上一个页面中的值，进行修改
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
          avatar: res.tempImagePath
        })

        //跳转会上一个页面  [v1,v2,v2]
        wx.navigateBack({});
      }
    })
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