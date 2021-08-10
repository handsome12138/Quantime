// miniprogram/pages/PeopleList/PeopleList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TableID: '',
    windowHeight: 0,
    JoinInfo: [],
    BeginShowText: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      TableID: options.TableID
    })
    wx.cloud.callFunction({
      name: 'GetStat',
      data:{
        TableID: options.TableID
      }
    }).then(res => {
      console.log('PeopleList GetStat res=',res)
      this.setData({
        JoinInfo: res.result.JoinInfo,
        BeginShowText: true
      })
    })
    this.handleGetSystemInfo();
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

  },
  handleGetSystemInfo(){
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        });
      }
    })
  },
})