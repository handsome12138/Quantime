// components/TimeBar_Stat/TimeBar_Stat.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    PeopleCount:{
      type:Array,
      value:[
      {
        Date:"2020.4.3",
        Stat:[0,0,0,0,0,6,0,0,9,0,11,0,0,0,0,0,17,18,0,20,21,22,23,0,
        1,2,3,4,5,6,7,8,9,10]
      },
      {
        Date:"2020.4.4",
        Stat:[0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,20,21,22,23,0,
        1,2,3,4,5,6,7,8,9,10]
      },
      {
        Date:"2020.4.5",
        Stat:[0,0,0,0,0,0,0,8,9,10,0,0,0,0,0,0,0,0,0,0,0,0,23,0,
        1,2,3,4,5,6,7,8,9,10]
      }
    ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    Hour:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,
      1,2,3,4,5,6,7,8,9,10],
    Current:5,
    width:0,
    date:0,
    CurrentStat:{},
    ndColorAarray:[],
    _colorArray:[],
  },
  lifetimes:{
    attached:function(){
      var windowWidth = wx.getSystemInfoSync().windowWidth
      this.setData({
              width:(windowWidth*0.9*0.92-65)*0.1,
              CurrentStat:this.properties.PeopleCount[this.data.date]
           })
      console.log(this.data.width)
      console.log(this.data.CurrentStat)
      var Colorndarray = [], max = 0, _array = [], tempColorArray = []
      for(var i = 0;i<this.properties.PeopleCount.length;i++){
        max = Math.max(...this.properties.PeopleCount[i].Stat);
        for(var j = 0;j<this.properties.PeopleCount[i].Stat.length;j++){
          _array.push(this.properties.PeopleCount[i].Stat[j]/max)
          tempColorArray.push(`rgb(255,255,${255-Math.round(_array[j]*255)})`)//根据百分比计算RGB数组
        }
        Colorndarray.push(tempColorArray)
        _array = []
        tempColorArray = []
      }
      this.setData({
        ndColorAarray:Colorndarray
      })
      this.setData({
        _colorArray:this.data.ndColorAarray[this.data.date]
      })
    }
  },
  pageLifetimes:{
    // show:function(){
    //   this.GetPostion()
    // }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    scroll:function(e){
    //  let query = wx.createSelectorQuery();
    //  let that = this;
    //  query.select('#timedot').boundingClientRect(function(rect){
    //    that.setData({
    //       width:rect.width
    //    })
    //  }).exec();
    //  console.log(this.data.width)
     var dist = e.detail.scrollLeft
    //  console.log(dist)
     if(dist > 14 && dist < 14+this.data.width){
      this.setData({
        Current:6
      })
      console.log(this.data.Current)
     }else if(dist > 14){
      this.setData({
        Current:(6 + parseInt((dist - 14)/this.data.width))%24
      })
      console.log(this.data.Current)
     }
    },
    handleClick:function(){
      this.setData({
       date:(this.data.date + this.properties.PeopleCount.length - 1)%this.properties.PeopleCount.length
     })
     console.log(this.data.date)
     this.setData({
      CurrentStat:this.properties.PeopleCount[this.data.date],
      _colorArray:this.data.ndColorAarray[this.data.date]
    })
   },
   handlerightClick:function(){
    this.setData({
      date:(this.data.date + 1)%this.properties.PeopleCount.length
    })
    console.log(this.data.date)
    this.setData({
      CurrentStat:this.properties.PeopleCount[this.data.date],
      _colorArray:this.data.ndColorAarray[this.data.date]
    })
  }
  }
})
