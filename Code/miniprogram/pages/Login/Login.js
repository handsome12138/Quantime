// miniprogram/pages/Quantime/Login/Login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  getAccessFun:function(){
    const db = wx.cloud.database();
    wx.getUserProfile({
      desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.globalData.avatarURL = res.userInfo.avatarUrl;
        app.globalData.NickName = res.userInfo.nickName;
        app.globalData.hasUserInfo = true;
        
        db.collection('User').add({
          data:{
            'OpenID': app.globalData.openid, //OpenID
            'avatarURL': res.userInfo.avatarUrl,
            'NickName': res.userInfo.nickName
          }
        });
        console.log('[debug]Login Userinfo', res.userInfo);
        wx.reLaunch({
          url: '/pages/TeamMain/TeamMain'
        })
      }
    })
    // wx.getUserInfo({
    //   success: res => {
    //     // 可以将 res 发送给后台解码出 unionId
    //     // console.log("get access userInfo", res.userInfo) 
    //     app.globalData.userInfo = res.userInfo;
    //     app.globalData.getUserInfo = true;
    //     wx.reLaunch({
    //       url: '/pages/TeamMain/TeamMain'
    //     })
    //   }
    // }) // 已经调整接口
    // https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801
  },
})