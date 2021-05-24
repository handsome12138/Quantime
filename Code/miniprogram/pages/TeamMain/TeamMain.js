// pages/Quantime/TeamMain/TeamMain.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ShowRefreshText: false,
    BeginShowText: false,
    _tblist: [],//保存this.GetTableInfo()获取的源数据
    tblist: [],
    modalname: null,
    TabCur: 0,
    ClassName: '',
    tblist_index:null,
    tblist_name: [],
    TableName: '',
    TableContent: '',
    index: null,
    subsequence:""
    
  },

  /** 
   * filter函数，输入classList,filter的subsequence,返回new_classList
  */
  filter: function (classList, subsequence){
    let new_classList = []

    let str=""
    for( let i=0; i<classList.length; i++){
      str = classList[i].ClassName
      if(str.includes(subsequence)){//如果类名包括subsequence，整个类通过filter
        new_classList.push(classList[i])
      }
      else{//否则，类内逐个判断表名是否包括subsequence
        let tableList = classList[i].TimeTables
        let new_tableList = []
        let existTableFlag = false
        for(let j=0; j<tableList.length; j++){
          str = tableList[j].Name
          if(str.includes(subsequence)){
            new_tableList.push(tableList[j])
            existTableFlag = true
          }
        }
        if(existTableFlag == true){
          let newClass = classList[i]
          newClass.tableList = new_tableList
          new_classList.push(newClass)
        }
      }
    }  
    
    return new_classList
  },

  doSearch: function(e){
    let subsequence = this.data.subsequence
    let tblist = this.data._tblist
    let new_tblist = this.filter(tblist,subsequence)
    console.log("[debug]: new_tblist",new_tblist)
    this.setData({
      tblist: new_tblist
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(app.globalData.hasUserInfo == false){
    //   wx.redirectTo({
    //     url: '/pages/Login/Login',
    //   })
    // }
    console.log('TeamMain onLoad');
    // this.GetTableInfo();//似乎wx.relaunch不会触发onShow只会触发onLoad?现在又可以了，故每次在onShow获取
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('TeamMain onReady');
    // setTimeout(this.GetTableInfo, 1500);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('TeamMain onShow');
    if(typeof(this.getTabBar) === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        curSelected: 0
      })
    }
    this.GetTableInfo();//这里是为了让发布消息等状态切换回到页面时能重新获取
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 下拉刷新
  onPullDownRefresh: function () {
    //调用刷新时将执行的方法
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.setData({
      ShowRefreshText: true
    })
    this.GetTableInfo();
  },
  GetTableInfo: function(){
    // 这里可能app.globalData还没有初始化ok
    wx.cloud.callFunction({
      name: 'GetTableInfo',
      // data:{
      //   OpenID: app.globalData.openid,
      // }
    }).then(res=>{
      // console.log('[debug][TeamMain] call cloud:', res);
      this.setData({
        _tblist : res.result.tblist,
        tblist: res.result.tblist,
        BeginShowText: true
      }, ()=>{
        // console.log(this.data.tblist);
      })
    })
    //隐藏loading 提示框
    wx.hideLoading();
    //隐藏导航条加载动画
    wx.hideNavigationBarLoading();
    //停止下拉刷新
    wx.stopPullDownRefresh();
    this.setData({
      ShowRefreshText: false
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
    console.log('[debug] this.data.tblist_name = ',this.data.tblist_name);
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
      console.log("[debug]: this.data.tblist_index ",this.data.tblist_index)
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
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      tblist_index: e.detail.value
    })
  },
  GotoForm: function(){
    wx.navigateTo({
      url: '/pages/Form/Form',
    })
  }
})
