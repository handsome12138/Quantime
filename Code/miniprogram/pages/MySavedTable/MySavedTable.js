// miniprogram/pages/MySavedTable/MySavedTable.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TableList: [],
    BeginShowText: false
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
    wx.cloud.callFunction({
      name: 'GetSavedTable'
    }).then(res => {
      console.log('MySavedTable call res=', res)
      this.setData({
        TableList: res.result.TableList,
        BeginShowText: true
      })
    })
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
  GotoStat: function(e){
    console.log("MySavedTable Goto Stat", e);
    wx.navigateTo({
      url: '/pages/Stat/Stat?TableID=' + e.target.dataset.id,
    })
  }
})