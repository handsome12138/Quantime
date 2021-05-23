// components/ClassBar/ClassBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // className: String,
    classData: Object,
    ClassObj: Object,
    Index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    myshow: true,
    editHidden: false,
    checkHidden: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    HandleDelete(){
      var that = this;
      wx.showModal({
        title: '提示',
        content: '是否确认删除，这将递归删除类下的所有表单',
        success(res){
          if(res.confirm){
            wx.cloud.callFunction({
              name: 'DeleteTimeTableClass',
              data:{
                ClassID: that.data.ClassObj._id
              }
            })
            that.setData({
              myshow: false
            })
            wx.showToast({
              title: '删除成功',
              duration: 1000,
              // success: function(){
                
              //   wx.reLaunch({
              //     url: '/pages/ClassManagement/ClassManagement',
              //   })
              // }
            })
          }
        }
  
      })
    },
    touchEdit(){
      console.log('[debug] touchEdit()')
      this.setData({
        editHidden: true,
        checkHidden: false,
      })
    },
  
    touchCheck(){
      console.log('[debug] touchCheck()')
      this.setData({
        editHidden: false,
        checkHidden: true,
      })
  
    },
  },

  
})
