// pages/Mine/Mine.js\
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarURL: '',
    // avatarURL: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Df6Xk0PLxDjkDndxQtjEJLcRelmHweKve3qJPiaLqhiaBlgJrODOn02gdicy1ybO1pvgj3hyeK7Vr0cVCefPpQYRA/132',
    
    NickName: 'default',
    
    recents: [],
    collections: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // userInfo: '',
    obj: '',
    editHidden: false,
    checkHidden: true,
    modalname: '',
  },


  touchEdit(){
    // console.log('[debug] touchEdit()')
    this.setData({
      editHidden: true,
      checkHidden: false,
    })
  },

  touchCheck(){
    // console.log('[debug] touchCheck()', this.data.ClassObj)
    this.setData({
      editHidden: false,
      checkHidden: true,
    })
    // const db = wx.cloud.database();
    // db.collection('TimeTableClass').where({
    //   _id: this.data.ClassObj._id
    // }).update({
    //   data:{
    //     ClassName: this.data.MyClassName
    //   }
    // })

  },
  bindViewTap: function(e){
    console.log(this.data.avatarURL)
  },
  GotoUser: function(){
    // wx.navigateTo({
    //   url: '/pages/User/User',
    // })
  },
  ShowModal: function(e){
    this.setData({
      modalname: e.currentTarget.dataset.modalname
    })
  },
  HideModal: function(){
    this.setData({
      modalname: null
    })
  },
  SubmitModal: function(e){
    var that = this;
    if(e.currentTarget.dataset.modalname == "EditNickname"){
      // 修改昵称
      // wx.cloud.callFunction({
      //   name: 'AlterTimeTableBelong',
      //   data:{
      //     TableID: this.data.TableID,
      //     NewClassID: this.data.ClassIDList[this.data.MoveTableIdx]
      //   }
      // })
      wx.showToast({
        title: '修改成功',
        duration: 500,
        success(){
          that.HideModal();
        }
      })
    }
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.avatarURL && app.globalData.NickName){
      this.setData({
        avatarURL: app.globalData.avatarURL,
        NickName: app.globalData.NickName
      })
    } else {
      wx.navigateTo({
        url: '/pages/Login/Login',
      })
    }
    
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
    if(typeof(this.getTabBar) === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        curSelected: 1
      })
    }
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