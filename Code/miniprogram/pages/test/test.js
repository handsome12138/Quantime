// miniprogram/pages/Test/test.js
import pinyin from 'wl-pinyin';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    JoinInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('拼音test', pinyin.getFirstLetter('#$23')[0])
    wx.cloud.callFunction({
      name: 'GetStat',
      data:{
        TableID: "cbddf0af608ffca705da729849fec9fa"
      }
    }).then(res => {
      console.log('test getstat',res)
      this.setData({
        JoinInfo: res.result.JoinInfo
      })
    })
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