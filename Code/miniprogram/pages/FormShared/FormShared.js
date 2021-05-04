// pages/FormShared/FormShared.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TableID: null,
    TableInfo: {},
    InviterID: null,
    InviterInfo: {},
    nickname:"Animagus",
    title:"属于FormShared的标题",
    intro:"属于FormShared的简介，简介和标题都在页面内在生命周期函数中用this.setData获取\n之后传值给组件TitleAndIntor进行显示",
    inviter:{
      nickname:"Animagus",
      avatar:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
    },
    item:{
      Name:"属于FormShared的标题",
      Context:"属于FormShared的简介，简介和标题都在页面内在生命周期函数中用this.setData获取\n之后传值给组件TitleAndIntor进行显示",
      Status:1,
      SaveFlag:1
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      TableID: options.TableID,
      InviterID: options.InviterID
    })
    const db = wx.cloud.database();
    db.collection('TimeTable').where({
      '_id': options.TableID //ID
    }).get().then(res=>{
      console.log('timemain tableid:',this.data.TableID ,'tableinfo:', res.data);
      this.setData({
        TableInfo: res.data[0]
      })
    })
    
    db.collection('User').where({
      OpenID: options.InviterID
    }).get().then(res => {
      console.log('timemain inviterid:',this.data.InviterID ,'inviterinfo:', res.data);
      this.setData({
        InviterInfo: res.data[0]
      })
    })
    // 以下是检验是否注册过了
    db.collection('TimeTable_Member_Relation').where({
      TableID: options.TableID,
      UserID: app.globalData.openid
    }).get().then(res => {
      if(res.data.length > 0){
        wx.navigateTo({
          url: '/pages/TimeSelect/TimeSelect?TableID='+options.TableID,
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
  RegisterJoin: function(){
    wx.cloud.callFunction({
      name:'JoinTimeTable',
      data:{
        TableID: this.data.TableID
      }
    }).then(res => {
      console.log('Formshared Call Join res=', res);
    })
    wx.navigateTo({
      url: '/pages/TimeSelect/TimeSelect?TableID=' + this.data.TableID,
    })
  }
})