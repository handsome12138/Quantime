// pages/TimeSelect/TimeSelect.js
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    TableID: '',
    TableInfo: {},
    pageName:"TimeSelect",
    _index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    date: ["2021.4.3","2021.4.4","2021.4.5"],
    item:{
      Name:"属于TimeSelect的标题",
      Context:"属于TimeSelect的简介，简介和标题都在页面内在生命周期函数中用this.setData获取\n之后传值给组件TitleAndIntor进行显示",
      Status:1,
      SaveFlag:1
    },
    _particle: []
    // title:"属于TimeSelect的标题",
    // intro:"属于TimeSelect的简介，简介和标题都在页面内在生命周期函数中用this.setData获取\n之后传值给组件TitleAndIntor进行显示",
  },
  test: function(){
    console.log("[debug] test")
    const bar1 = this.selectComponent("#Bar-1").data
    console.log("[debug] bar1",bar1)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log("TimeSelect is onLoad.", options)
    this.setData({
      TableID: options.TableID
    })
    const db = wx.cloud.database();
    db.collection('TimeTable').where({
      '_id': options.TableID //ID
    }).get().then(res=>{
      // console.log('timeselect tableid:',this.data.TableID ,'tableinfo:', res.data);
      this.setData({
        TableInfo: res.data[0]
      })
    })
    // 以上在通过Options传递来的TableID获取TableInfo

    wx.cloud.callFunction({
      name: 'GetSelectTime',
      data:{
        TableID:options.TableID
      }
    }).then(res => {
      // console.log('TimeSelect Call GetSelectTime', res);
      for(var idx in res.result.SelectTime){
        var TimeBar = this.selectComponent('#Bar-'+idx);
        TimeBar.setData({
          _particle: res.result.SelectTime[idx]
        })
      }
    })
    // let o_index=[],i

    // for( i=0; i<24; i++){
    //   o_index.push(i)
    // }

    // this.setData({
    //   _index: o_index
    // })

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
  HandleFinish: function(){
    var SelectTime = [];
    for(var idx in this.data.TableInfo.Days){
      var TimeBar = this.selectComponent("#Bar-" + idx);
      SelectTime.push(TimeBar.data._particle);
    }
    wx.cloud.callFunction({
      name: 'AlterTimeSelected',
      data: {
        TableID: this.data.TableID,
        SelectTime: SelectTime
      }
    }).then(res =>{
      console.log('TimeSelect CALL altertimeselected res=',res);
    })
    wx.reLaunch({
      url: '/pages/TeamMain/TeamMain',
    })
  }
})