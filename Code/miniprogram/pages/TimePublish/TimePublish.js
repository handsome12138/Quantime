// pages/TimePublish/TimePublish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageName:"TimePublish",
    _index: [],
    date: ["2021.4.3","2021.4.4","2021.4.5"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("TimePublish is onLoad.")

    let o_index=[],i

    for( i=0; i<24; i++){
      o_index.push(i)
    }

    this.setData({
      _index: o_index
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