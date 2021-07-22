// miniprogram/pages/ClassManagement/ClassManagement.js
var app = getApp();
var lastSubmitTime = 0;//用于标注上一次Submit操作的时间，消除重复添加的BUG（方法3）
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

  let d = new Date();//(方法3成功)
  let nowtime = d.getTime();//获取点击时间
  console.log('[DEBUG] '+'nowtime: '+nowtime)
  console.log('[DEBUG] '+'lastSubmitTime: '+lastSubmitTime)
  if (nowtime - lastSubmitTime > 1500) {//1500ms内无法识别再点击
    //添加自己的代码段
    //尝试使用带透明蒙板的避免重复点击的BUG（好很多，基本上最多只会2,3次）（方法2还行）
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    


    wx.cloud.callFunction({
      name: 'AddTimeTableClass',
      data:{
        ClassName: this.data.newClassName,
      }
    }).then(res => {
      console.log('Add new class', this.data.newClassName, res)
      var tmpclasslist = this.data.ClassList;
      tmpclasslist.push({
        _id: res.result.id,
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
    lastSubmitTime = nowtime;
  }
    
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