// components/TimeSelectionBar/TimeSelectionBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    _particle:[],
    particle:[0,1,2,3,4,5,6],
    index: null,
    item: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    catchParticle: function(e){
      let i = e.currentTarget.dataset.id
      let pick_i = "pick["+i+"]"
      this.setData({
        index: e.currentTarget.dataset.id,
        item: e.currentTarget.dataset.target,
        // [pick_i]: !this.data.pick[i]
      })
      
      console.log(this.data.index," is catchParticle")

      let e_particle = this.data._particle
      // console.log("e_particle:", e_particle)

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
      console.log("_particle:",this.data._particle)
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

      console.log("this.data._particle:",this.data._particle)

    },

    ready: function(e){
      console.log("Components:TimeSelectionBar is ready.")
      
    }
  }
})