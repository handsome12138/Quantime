// pages/TimeMain/TimeMain.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TableID: '',
    TableInfo: {},
    item:{
      Name:"属于TimeMain的标题",
      Context:"属于TimeMain的简介",
      Status:1,

    },
    // StatusBar: app.globalData.StatusBar,
    // CustomBar: app.globalData.CustomBar,
    index: null,
    
    
  },

  changeStatus: function(e){
    //方法1
    // let newitem = this.data.item
    // newitem.Status = !newitem.Status
    
    // this.setData({
    //   item: newitem
    // })

    //方法2
    let newStatus = !this.data.item.Status
    // let i='Status'
    this.setData({
      [`item.Status`]:newStatus
    })
    this.onShow()
    // console.log(this.data.item.Status)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    this.setData({
      TableID: options.id
    });
    db.collection('TimeTable').where({
      '_id': options.id //ID
    }).get().then(res=>{
      console.log('timemain tableid:',this.data.TableID ,'tableinfo:', res.data);
      this.setData({
        TableInfo: res.data[0]
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
    return {
      title: '邀请你加入时间统计',
      path: '/pages/FormShared/FormShared?TableID='+this.data.TableID + '&InviterID=' + app.globalData.openid
    }
  }
})