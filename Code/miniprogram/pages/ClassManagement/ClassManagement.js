// miniprogram/pages/ClassManagement/ClassManagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    console.log('[debug][ClassManagement]: addclass:', this.data.newClassName);
    // wx.cloud.callFunction({
    //   name: 'AddTimeTableClass',
    //   data: {
    //     ClassName: this.data.newClassName
    //   }
    // }).then(res => {
    //   var newtblist = this.data.tblist;
    //   newtblist.push({
    //     ClassID: res.id,
    //     ClassName: this.data.newClassName,
    //     TimeTables: []
    //   })
    //   this.setData({
    //     tblist: newtblist
    //   })
    // })
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