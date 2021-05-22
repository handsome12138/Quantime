// components/StatColorBar/StatColorBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num_participants: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    array: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4],
    _array:[],
    normal_array:[],
    // colorArray:["rgb(8,8,8)","#f99999","#595959","#f99999","#595959","#999999",
    // "#595959","#f99999","#595959","#f99999","#595959","#999999",
    // "#595959","#f99999","#595959","#f99999","#595959","#999999",
    // "#595959","#f99999","#595959","#f99999","#595959","#999999"],
    _colorArray:[],
    max:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // myArrayMax: function(arr) {
    //   return Math.max.apply(null, arr)
    // },
  },

  lifetimes:{
    attached: function(e){
      console.log("Components:StatColorBar is attached.")
      console.log(this.data.array)
      
      let i,tempArray=[],temp_normal=[],tempColorArray=[]
      for( i=0; i<24; i++){
        tempArray.push( Math.round(Math.random()*30))
      }
      // this.setData({
      //   _array:tempArray
      // })
      this.setData({
        _array:this.properties.num_participants
      })

      this.setData({
        max: Math.max(...this.data._array),//更新最大值
      })
      console.log("MAX:",this.data.max)

      
      for( i=0; i<24; i++){
        temp_normal.push( this.data._array[i]/this.data.max )//计算百分比（人数/最大人数）数组
      }
      this.setData({
        normal_array: temp_normal,//更新百分比（人数/最大人数）数组
        
      })
      // console.log("temp_normal:", temp_normal)
      console.log("this.data.normal_array:",this.data.normal_array)

      for( i=0; i<24; i++){
        tempColorArray.push(`rgb(255,255,${255-Math.round(this.data.normal_array[i]*255)})`)//根据百分比计算RGB数组
      }
      console.log("tempColorArray:",tempColorArray)
      this.setData({
        _colorArray: tempColorArray//更新RGB数组
        
      })
    },


    ready: function(e){
      console.log("Components:StatColorBar is ready.")
      
    }
  }
})
