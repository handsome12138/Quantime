// components/Formlist/Formlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     itemlist:{
       type:Array,
       value:[
        {
          "title":"产品内建时间统计",
          "description":"什么是产品内建统计呢？产品内建统计就是...",
          "status":true,
          "peoplecount":25
        },
        {
          "title":"产品内建时间统计",
          "description":"什么是产品内建统计呢？产品内建统计就是...",
          "status":false,
          "peoplecount":25
        },
        {
          "title":"产品内建时间统计",
          "description":"什么是产品内建统计呢？产品内建统计就是...",
          "status":true,
          "peoplecount":25
        },
        {
          "title":"产品内建时间统计",
          "description":"什么是产品内建统计呢？产品内建统计就是...",
          "status":false,
          "peoplecount":25
        }
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
    flag:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    teamclick:function(e){
      this.setData({
        flag:!this.data.flag
      })
      console.log(this.data.flag)
    },
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
      console.log(this.data.flag)
    }
  }
})
