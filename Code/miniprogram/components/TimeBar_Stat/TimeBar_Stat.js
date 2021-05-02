// components/TimeBar_Stat/TimeBar_Stat.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    PeopleCount:{
      type:Array,
      value:[
      ],
      observer:function(){
        this.Prepare()
      }
    },
    // 真实的数据结构
    // {
    //   "2020-04-01": [0,0,1,2,3, ...],
    //   "2020-04-02": [0,0,1,2,3, ...],
    //   "2020-04-03": [0,0,1,2,3, ...],
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    Hour:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0],
    Current:0,
    width:0,
    date:0,
    CurrentStat:{},
    ndColorAarray:[],
    _colorArray:[],
  },
  lifetimes:{
    // attached:function(){
    //   var windowWidth = wx.getSystemInfoSync().windowWidth
    //   this.setData({
    //           width:(windowWidth*0.9*0.92-65)*0.1,
    //           CurrentStat:this.properties.PeopleCount[this.data.date]
    //        })
    //   console.log(this.data.width)
    //   console.log(this.data.CurrentStat)
    //   var Colorndarray = [], max = 0, _array = [], tempColorArray = []
    //   for(var i = 0;i<this.properties.PeopleCount.length;i++){
    //     max = Math.max(...this.properties.PeopleCount[i].Stat);
    //     for(var j = 0;j<this.properties.PeopleCount[i].Stat.length;j++){
    //       _array.push(this.properties.PeopleCount[i].Stat[j]/max)
    //       tempColorArray.push(`rgb(255,255,${255-Math.round(_array[j]*255)})`)//根据百分比计算RGB数组
    //     }
    //     Colorndarray.push(tempColorArray)
    //     _array = []
    //     tempColorArray = []
    //   }
    //   this.setData({
    //     ndColorAarray:Colorndarray
    //   })
    //   this.setData({
    //     _colorArray:this.data.ndColorAarray[this.data.date]
    //   })
    // }
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
    Prepare:function(){
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
    },
    scroll:function(e){
    // console.log('debug in timebar_stat, ', this.data.PeopleCount);
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
        Current:1
      })
      console.log(this.data.Current)
     }else{
      this.setData({
        Current:(1 + parseInt((dist - 14)/this.data.width))%24
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
