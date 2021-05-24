// components/TimeSelectionBar/TimeSelectionBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
    iniParticle:Array,
    control:{
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _particle:[],// 0:橘色（可选），-1：灰色（锁定无法在Selcet页选择），1：蓝色（选中表示有空）
    
    index: null,
    item: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    catchParticle: function(e){
      
      let i = e.currentTarget.dataset.id
      // console.log("[debug] i:", i)
      
      this.setData({
        index: e.currentTarget.dataset.id,
        item: e.currentTarget.dataset.target,
      })
      
      // console.log('[debug] ',this.data.index," is catchParticle")

      let e_particle = this.data._particle
      // console.log("e_particle:", e_particle)
      if(this.properties.control){
        // 方法1：在用组件的data渲染的条件下判断组件所处页面，从而决定点击形态
        switch(this.properties.pageName){
          case "TimePublish":
            if(e_particle[i] == 1){
              // console.log("ERROR! wrong state of _particle", i)
              break
            }
            e_particle[i] = (e_particle[i] - 1)%2
            // console.log("[debug] TimePublish change e_particle", i)
            break
            
          case "TimeSelect":
            if(e_particle[i] == -1){
              // console.log("Warning! catch the block quantime:", i)
              break
            }
            e_particle[i] = (e_particle[i] + 1)%2
            break
          default:

              break;
        }

        // console.log("e_particle:", e_particle)
        // console.log("this.data._particle:",this.data._particle)
        
        this.setData({
          _particle: e_particle
        }) 
      }
      else{
        // console.log('[debug] control is false')
      }
      
      
      // this.triggerEvent('returnIndex',{index: this.data.index})

      // this.setData({
      //   _formInfo: this.properties.formInfo
      // })
      // console.log("_formInfo after setData in catchParticle:",this.data._formInfo)
    },
  },

  lifetimes:{
    attached: function(e){
      // console.log("[debug] Components:TimeSelectionBar is attached.")
      // console.log("_particle:",this.data._particle)
      // console.log("pageName:",this.properties.pageName)
      
      //随机初始化TimeSelectionBar.wxml
      let i,tempArray=[],temp_normal=[],tempColorArray=[]
      
      //原版随机初始化tempArray
      // switch(this.properties.pageName){
      //   case "TimePublish":
      //     for( i=0; i<24; i++){
      //       // tempArray.push( Math.round(Math.random()*2)-1)
      //       tempArray.push(0)
      //     }
      //     break
      //   case "TimeSelect":
      //     for( i=0; i<24; i++){
      //       tempArray.push( Math.round(Math.random()*1)-1)
      //       // tempArray.push(0)
      //     }
      //     break
      //   default:

      //       break; 
      // }
      //新版tempArray = this.properties.iniParticle
      tempArray = this.properties.iniParticle
      // console.log("[debug] tempArray:",tempArray)
      this.setData({
        _particle: tempArray
      })

    },

    ready: function(e){
      // console.log("Components:TimeSelectionBar is ready.")
      
    }
  }
})
