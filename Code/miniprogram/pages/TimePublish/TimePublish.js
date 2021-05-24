// pages/TimePublish/TimePublish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TableID: '',
    TableInfo: {},
    pageName:"TimePublish",
    _index: [],
    date: ["2021.4.3","2021.4.4","2021.4.5"],
    // quant:[[0,0,0,0,0],[]],
    quant:[],
    item:{
      Name:"属于TimePublish的标题",
      Context:"属于TimePublish的简介，简介和标题都在页面内在生命周期函数中用this.setData获取\n之后传值给组件TitleAndIntor进行显示",
      Status:1,
      SaveFlag:1
    },
    // title:"属于TimePublish的标题",
    // intro:"属于TimePublish的简介，简介和标题都在页面内在生命周期函数中用this.setData获取\n之后传值给组件TitleAndIntor进行显示",
  },

  test: function(){
    var DaysChoosen = [];
    for(var idx in this.data.TableInfo.Days){
      var obj = {
        date: this.data.TableInfo.Days[idx],
        choose: this.selectComponent('#Bar-' + idx).data.particle
      }
      DaysChoosen.push(obj);
    }
    console.log("[debug] test")
    const bar1 = this.selectComponent("#Bar-1")
    console.log("[debug] bar1",bar1)
    let tempSubArray=[], j
      for( j=0; j<24; j++){
        // tempArray.push( Math.round(Math.random()*2)-1)
        tempSubArray.push(0)
      }
    bar1.setData({
      _particle:tempSubArray
    })
    // this.onShow()
    // const bar1 = this.selectComponent("#Bar-0").data
    console.log("[debug] TimePublish Test", DaysChoosen)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("Page:TimePublish is onLoad.")
    this.setData({
      TableID: options.TableID
    })
    const db = wx.cloud.database();
    db.collection('TimeTable').where({
      _id: options.TableID
    }).get().then(res => {
      this.setData({
        TableInfo: res.data[0]
      })
      console.log('[debug]TimePublish TableInfo', res.data[0]);
    })

    //初始化_index
    let o_index=[],i,j

    for( i=0; i<24; i++){
      o_index.push(i)
    }

    this.setData({
      _index: o_index
    })

    //初始化quant
    let tempArray=[]
    let date = this.data.date
    for( i=0; i<date.length; i++){
      let tempSubArray=[]
      for( j=0; j<24; j++){
        // tempArray.push( Math.round(Math.random()*2)-1)
        tempSubArray.push(0)
      }
      tempArray.push(tempSubArray)
    }
    
    this.setData({
      quant:tempArray
    })
    console.log("[debug] this.data.quant", this.data.quant)
    // console.log("[debug] this.onShow()",this.onShow())

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
  GoBack: function(){
    wx.navigateBack();
  },
  GoFinish: function(){
    // this.test();
    var Avaliable = [];
    for(var idx in this.data.TableInfo.Days){
      var obj = {
        date: this.data.TableInfo.Days[idx],
        choose: this.selectComponent('#Bar-' + idx).data.particle
      }
      Avaliable.push(obj);
    }
    console.log('[debug]TimePublish, TableInfo=', this.data.TableInfo, 'Avaliable list=', Avaliable);
    wx.cloud.callFunction({
      name: 'AlterTableDaysAvaliable',
      data: {
        TableID: this.data.TableID,
        Avaliable: Avaliable
      }
    })
    wx.reLaunch({
      url: '/pages/TeamMain/TeamMain',
    })
  }
})