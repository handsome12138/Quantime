// components/Timeselect/Timeselect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    timeList:[]
  },

  /**
   * 组件的方法列表
   */
  lifetimes:{
    attached:function(){
      this.setData({
      timeList: this.initTimeList(24)
    })
    }
  },
  methods: {
    initTimeList:function(itemNum){
      // 基础判断
      if (itemNum <= 0){
        console.log(' Error From initTimeList()：所需时段数不可小于等于零')
        return []
      }
  
      // 当前时段
      var nowTime = new Date().getHours()
  
      // 组装数组
      var timeList = []
      for (var t = 0; t < itemNum ; t++){
        t > 9 ? (timeList.push({ 'index': t, 'time': t + ':00', 'hint': (t == nowTime ? '抢购进行中' : (t > nowTime ? '即将开始' : '已开抢')) })) : (timeList.push({ 'index': t, 'time': '0' + t + ":00", 'hint': (t == nowTime ? '抢购进行中' : (t > nowTime ? '即将开始' : '已开抢')) }))
      }
      return timeList
    },
    clickItem:function(item){
      // 列表点击事件
      console.log(item.currentTarget.dataset.item.index)
    }
  }
})
