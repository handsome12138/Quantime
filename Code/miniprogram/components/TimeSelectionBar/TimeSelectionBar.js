// components/TimeSelectionBar/TimeSelectionBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
    particle: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    _particle:[],// 0:橘色（可选），-1：灰色（锁定无法在Selcet页选择），1：蓝色（选中表示有空）
    // particle:[0,1,2,3,4,5,6],
    index: null,
    item: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    catchParticle: function(e){
      // this.setData({
      //   _particle:this.properties.particle
      // })
      let i = e.currentTarget.dataset.id
      let pick_i = "pick["+i+"]"
      // this.properties[i] = 1
      this.setData({
        index: e.currentTarget.dataset.id,
        item: e.currentTarget.dataset.target,
        // [pick_i]: !this.data.pick[i]
      })
      
      console.log(this.data.index," is catchParticle")

      let e_particle = this.data._particle
      // console.log("e_particle:", e_particle)

      // 方法1：在用组件的data渲染的条件下判断组件所处页面，从而决定点击形态
      switch(this.properties.pageName){
        case "TimePublish":
          if(e_particle[i] == 1){
            console.log("ERROR! wrong state of _particle", i)
            break
          }
          e_particle[i] = (e_particle[i] - 1)%2
          this.setData({
            _particle: e_particle
          })
          // console.log("this.data._particle:",this.data._particle)
          // console.log("e_particle:", e_particle)
          break
        case "TimeSelect":
          if(e_particle[i] == -1){
            console.log("Warning! catch the block quantime:", i)
            break
          }
          e_particle[i] = (e_particle[i] + 1)%2
          this.setData({
            _particle: e_particle
          })
          break
        default:

            break;
      }

      console.log("[debug] this.data._particle",this.data._particle)
      console.log("[debug] this.properties.particle",this.properties.particle)
      this.properties.particle = this.data._particle
      console.log("[debug] this.data._particle",this.data._particle)
      console.log("[debug] this.properties.particle",this.properties.particle)
      this.onShow
      // this.triggerEvent('returnIndex',{index: this.data.index})

      // this.setData({
      //   _formInfo: this.properties.formInfo
      // })
      // console.log("_formInfo after setData in catchParticle:",this.data._formInfo)
    },
  },

  lifetimes:{
    attached: function(e){
      console.log("Components:TimeSelectionBar is attached.")
      // console.log("_particle:",this.data._particle)
      console.log("pageName:",this.properties.pageName)
      
      //随机初始化TimeSelectionBar.wxml
      let i,tempArray=[],temp_normal=[],tempColorArray=[]
      

      switch(this.properties.pageName){
        case "TimePublish":
          for( i=0; i<24; i++){
            // tempArray.push( Math.round(Math.random()*2)-1)
            tempArray.push(0)
          }
          break
        case "TimeSelect":
          for( i=0; i<24; i++){
            tempArray.push( Math.round(Math.random()*1)-1)
            // tempArray.push(0)
          }
          break
        default:

            break; 
      }
      
      this.setData({
        _particle:tempArray
      })
      // this.properties.particle = tempArray
      // this.setData({
      //   _particle:this.properties.particle
      // })
      // console.log("[debug] this.properties.particle:",this.properties.particle)
      // console.log("[debug] this.data._particle:",this.data._particle)

    },

    ready: function(e){
      console.log("Components:TimeSelectionBar is ready.")
      
    }
  }
})
