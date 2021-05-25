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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  },
  HandleLongTap: function(e){
    // 实际上是delete
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除保存的表单',
      success(res){
        if(res.confirm){
          wx.cloud.database().collection("TimeTable_Save_Relation").where({
            TableID: e.target.dataset.id
          }).remove()
          wx.showToast({
            title: '删除成功',
            duration: 1000,
          })
          var NewTableList = that.data.TableList;
          NewTableList.splice(e.target.dataset.index, 1);
          that.setData({
            TableList: NewTableList
          })
          console.log('after splice', that.data.TableList)
        }
      }

    })
  }
})