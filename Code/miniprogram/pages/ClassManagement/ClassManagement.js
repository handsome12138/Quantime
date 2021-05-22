// miniprogram/pages/ClassManagement/ClassManagement.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ClassList: [],
    classGroup:[
      {
        name:'团支部'
      },
      {
        name:'求是潮'
      },
      {
        name:'思修小组'
      },
      {
        name:'沟通技巧'
      }
    ],
    newClassName:'',
    modalname:''
  },


  ShowModal: function(){
    this.setData({
      modalname: 'Create'
    })
  },
  HideModal: function(){
    this.setData({
      modalname: null
    })
  },
  Submit: function(e){
    // 新建类
    // console.log('[debug][ClassManagement]: addclass:', this.data.newClassName);
    const db = wx.cloud.database();
    db.collection('TimeTableClass').add({
      data:{
        ClassName: this.data.newClassName,
        OpenID: app.globalData.openid
      }
    }).catch(res => {
      console.log("Add new class FAIL: ", res);
      wx.showToast({
        title: '新增类失败',
        duration: 1000
      })
    }).then(res => {
      console.log('Add new class', this.data.newClassName, res)
      var tmpclasslist = this.data.ClassList;
      tmpclasslist.push({
        _id: res._id,
        ClassName: this.data.newClassName,
        OpenID: app.globalData.openid
      })
      this.setData({
        ClassList: tmpclasslist
      })
    })
    this.setData({
      modalname: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'GetClassList'
    }).then(res =>{
      console.log('GetClassList in ClassManagerment', res);
      this.setData({
        ClassList: res.result.ClassList
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