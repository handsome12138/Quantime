// pages/Quantime/TeamMain/TeamMain.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tblist: [],
    modalname: null,
    TabCur: 0,
    ClassName: '',
    tblist_index: 0,
    tblist_name: [],
    TableName: '',
    TableContent: ''
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
    setTimeout(this.GetTableInfo, 500);
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
      // console.log('[debug][TeamMain] call cloud:', res);
      this.setData({
        tblist: res.result.tblist
      }, ()=>{
        // console.log(this.data.tblist);
      })
    })
  },
  ShowModal: function(){
    this.setData({
      modalname: 'Create'
    })
    var tblist_name = [];
    for(var item of this.data.tblist){
      tblist_name.push(item.ClassName);
    }
    this.setData({
      tblist_name: tblist_name
    })
    console.log('[debug] tblist_name = ',tblist_name);
  },
  HideModal: function(){
    this.setData({
      modalname: null
    })
  },
  TabSelect: function(e){
    this.setData({
      TabCur: e.currentTarget.dataset.tabid
    })
  },
  Submit:function(){
    if(this.data.TabCur == 0){
      // 新建类
      console.log('[debug][TeamMain]: addclass:', this.data.ClassName);
      wx.cloud.callFunction({
        name: 'AddTimeTableClass',
        data: {
          ClassName: this.data.ClassName
        }
      }).then(res => {
        var newtblist = this.data.tblist;
        newtblist.push({
          ClassID: res.id,
          ClassName: this.data.ClassName,
          TimeTables: []
        })
        this.setData({
          tblist: newtblist
        })
      })
    }else{
      wx.cloud.callFunction({
        name: 'AddTimeTable',
        data: {
          BelongClassID: this.data.tblist[this.data.tblist_index].ClassID,
          Name: this.data.TableName,
          Context: this.data.TableContent,
          Status: 1
        }
      }).then(res =>{
        this.GetTableInfo();
        console.log('[debug][AddTimeTable]',res);
      })
    }
    this.setData({
      modalname: null
    })
  }
})