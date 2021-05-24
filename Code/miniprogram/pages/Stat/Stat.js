// pages/Stat/Stat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BeginShow: false,
    TableID: '',
    TableInfo:{
      Name:"",
      Context:"",
      Status:1,
      Days:['2021.4.3','2021.4.4','2021.4.5'],
      SaveFlag:1
    },
    participants:[
      [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4],
      [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4],
      [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      TableID: options.TableID
    });
    wx.cloud.callFunction({
      name: 'GetStat',
      data:{
        TableID: options.TableID
      }
    }).then(res => {
      // console.log('[debug] stat res data = ', res.result)
      this.setData({
        TableInfo: res.result.TableInfo,
        PeopleCount: res.result.PeopleCount,
        JoinInfo: res.result.JoinInfo,
        UserObj: res.result.UserObj,
        BeginShow: true
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

  },
  GoToStatDetails: function(){
    wx.navigateTo({
      url: '/pages/StatDetail/StatDetail?TableID=' + this.data.TableID,
    })
  }
})