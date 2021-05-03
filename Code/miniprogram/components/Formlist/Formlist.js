// components/Formlist/Formlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:{
        type: String,
        value: "default title"
      },
     itemlist:{
       type:Array,
       value:[
        {
          "Name":"产品内建时间统计",
          "Context":"什么是产品内建统计呢？产品内建统计就是...",
          "Status": 1,
        },
        // {
        //   "title":"产品内建时间统计",
        //   "description":"什么是产品内建统计呢？产品内建统计就是...",
        //   "status":false,
        //   "peoplecount":25
        // }
       ]
     },
     display:{
       type:Boolean,
       value:false,
      //  observer: function(newVal, oldVal) {
      //   this.updateRate()		//这里通过this.updateRate()方法来更新数据
      // }
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    teamclick:function(e){
      this.setData({
        flag:!this.data.flag
      })
      // console.log(this.data.flag)
    },
    GotoTimeMain:function(e){
      var id = e.currentTarget.dataset.id;
      // console.log('go to time main:', id);
      wx.navigateTo({
        url: '/pages/TimeMain/TimeMain?id='+id,
      })
    }
    // updateRate:function(e){
    //   this.setData({
    //     flag:this.properties.display
    //   })
    //   console.log(this.data.flag)
    //   console.log("Has updated")
    // }
  },
  pageLifetimes:{
    show:function(){
      this.setData({
        flag:this.properties.display
      })
      // console.log(this.data.flag)
    }
  }
})
