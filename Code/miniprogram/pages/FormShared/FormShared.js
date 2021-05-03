// pages/FormShared/FormShared.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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