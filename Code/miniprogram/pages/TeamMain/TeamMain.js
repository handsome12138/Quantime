// pages/Quantime/TeamMain/TeamMain.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tblist: []
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
    setTimeout(this.GetTableInfo, 1000);
    // this.GetTableInfo();
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

  },

  GetTableInfo: function(){
    // 这里可能app.globalData还没有初始化ok
    wx.cloud.callFunction({
      name: 'GetTableInfo',
      data:{
        OpenID: app.globalData.openid,
      }
    }).then(res=>{
      console.log('[debug][TeamMain] call cloud:', res);
      this.setData({
        tblist: res.result.tblist
      }, ()=>{
        console.log(this.data.tblist);
      })
    })
  }
})