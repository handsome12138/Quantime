// pages/Mine/Mine.js\
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    EditNickName: '',
    avatarURL: '',
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
      that.setData({
        NickName: that.data.EditNickName
      })
      wx.cloud.callFunction({
        name: 'UserRegister',
        data:{
          NickName: that.data.EditNickName,
          avatarURL: that.data.avatarURL
        }
      }).then(res => {
        console.log('UserRegister in Mine res=',res);
      })
      wx.showToast({
        title: '修改昵称成功',
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
    wx.cloud.callFunction({
      name: 'getUserInfo'
    }).then(res =>{
      console.log('Mine getUserInfo res=',res)
      if(!res.result.HasUserInfo){
        wx.navigateTo({
          url: '/pages/Login/Login',
        })
      }else{
        this.setData({
          avatarURL: res.result.avatarURL,
          NickName: res.result.NickName,
          EditNickName: res.result.NickName
        })
      }
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

  },
  showQQcode: function(){
    wx.previewImage({
      urls: ['cloud://development-7g9q612v12e4c773.6465-development-7g9q612v12e4c773-1305475033/src/QQcode.jpg'],
      current: 'cloud://development-7g9q612v12e4c773.6465-development-7g9q612v12e4c773-1305475033/src/QQcode.jpg' // 当前显示图片的http链接      
    })
  
  }
})