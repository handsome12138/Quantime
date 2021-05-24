// pages/TimeMain/TimeMain.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    EditTableName: '',
    EditTableContext: '',
    ClassIDList: [],
    ClassNameList: [],
    MoveTableIdx: 0,
    modalname: '',
    TableID: '',
    TableInfo: {},
    item:{
      Name:"属于TimeMain的标题",
      Context:"属于TimeMain的简介",
      Status:1,

    },
    // StatusBar: app.globalData.StatusBar,
    // CustomBar: app.globalData.CustomBar,
    index: null,
    
    
  },

  changeStatus: function(e){
    //方法1
    // let newitem = this.data.item
    // newitem.Status = !newitem.Status
    
    // this.setData({
    //   item: newitem
    // })

    //方法2
    let newStatus = !this.data.item.Status
    // let i='Status'
    this.setData({
      [`item.Status`]:newStatus
    })
    this.onShow()
    // console.log(this.data.item.Status)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();

    wx.cloud.callFunction({
      name: 'GetClassList'
    }).then(res=>{
      // console.log('[debug] TimeMain Clist', res);
      this.setData({
        ClassIDList: res.result.ClassIDList,
        ClassNameList: res.result.ClassNameList
      })
    })

    this.setData({
      TableID: options.id
    });
    db.collection('TimeTable').where({
      '_id': options.id //ID
    }).get().then(res=>{
      // console.log('timemain tableid:',this.data.TableID ,'tableinfo:', res.data);
      this.setData({
        TableInfo: res.data[0],
        EditTableName: res.data[0].Name,
        EditTableContext: res.data[0].Context
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
    return {
      title: '邀请你加入时间统计',
      path: '/pages/FormShared/FormShared?TableID='+this.data.TableID + '&InviterID=' + app.globalData.openid
    }
  },
  GotoStat: function(){
    wx.navigateTo({
      url: '/pages/Stat/Stat?TableID=' + this.data.TableID,
    })
  },
  HandleDeleteTable:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      success(res){
        if(res.confirm){
          wx.cloud.callFunction({
            name: 'DeleteTimeTable',
            data:{
              TableID: that.data.TableID
            }
          })
          wx.showToast({
            title: '删除成功',
            duration: 1000,
            success: function(){
              wx.reLaunch({
                url: '/pages/TeamMain/TeamMain',
              })
            }
          })
        }
      }

    })
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
    const db = wx.cloud.database();
    if(e.currentTarget.dataset.modalname == "MoveTable"){
      // 移动表单
      wx.cloud.callFunction({
        name: 'AlterTimeTableInfo',
        data:{
          TableID: this.data.TableID,
          NewClassID: this.data.ClassIDList[this.data.MoveTableIdx]
        }
      })
      wx.showToast({
        title: '移动成功',
        duration: 500
      })
    }else if(e.currentTarget.dataset.modalname == "CopyTable")
    {
      // 复制表单
      wx.cloud.callFunction({
        name: 'CopyTable',
        data:{
          TableID: this.data.TableID,
          ClassID: this.data.ClassIDList[this.data.MoveTableIdx]
        }
      })
      wx.showToast({
        title: '复制成功',
        duration: 500
      })
    }
    else if(e.currentTarget.dataset.modalname == "EditTitle"){
      db.collection('TimeTable').doc(that.data.TableID).update({
        data:{
          Name: that.data.EditTableName
        }
      })
      that.setData({
        'TableInfo.Name': that.data.EditTableName
      })
      wx.showToast({
        title: '编辑名称成功',
        duration: 500
      })
    }
    else if(e.currentTarget.dataset.modalname == "EditIntro"){
      db.collection('TimeTable').doc(that.data.TableID).update({
        data:{
          Context: that.data.EditTableContext
        }
      })
      that.setData({
        'TableInfo.Context': that.data.EditTableContext
      })
      wx.showToast({
        title: '编辑简介成功',
        duration: 500
      })
    }
    that.HideModal();
    
  },
  AlterTableStatus: function(){
    const db = wx.cloud.database();
    // console.log('Alter TimeTable Status')
    let NewStatus = 1 - this.data.TableInfo.Status
    this.setData({
      'TableInfo.Status': NewStatus
    })
    db.collection('TimeTable').where({
      _id: this.data.TableID
    }).update({
      data : {
        Status: NewStatus
      }
    })
  },
  AlterTableSave: function(){
    const db = wx.cloud.database();
    let NewSave;
    if( typeof(this.data.TableInfo.Save) != "undefined"){
      NewSave = 1 - this.data.TableInfo.Save
    }else{
      NewSave = 1
    }
    console.log('Alter TimeTable Status',NewSave,this.data.TableInfo)
    this.setData({
      'TableInfo.Save': NewSave
    })
    db.collection('TimeTable').where({
      _id: this.data.TableID
    }).update({
      data : {
        Save: NewSave
      }
    })
  },
  GotoPeopleList: function(){
    wx.navigateTo({
      url: '/pages/PeopleList/PeopleList?TableID=' + this.data.TableID,
    })
  },
  GotoTimeShow: function(){
    wx.navigateTo({
      url: '/pages/TimePublish/TimePublish?TableID=' + this.data.TableID + '&control=0',
    })
  }
})

