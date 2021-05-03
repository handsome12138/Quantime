// custom-tab-bar/index.js
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
      //当前高亮项
      curSelected: 0,
      //tabBar页面数据
      tabList: [
        {
          "pagePath": "pages/TeamMain/TeamMain",       
          "text": "时间统计"
        },
        {
          "pagePath": "pages/Mine/Mine",
          "text": "我的信息"
        },

      ]

  },
  attached: function() {},

  methods: {
    //底部切换
    switchTab(e) {
      console.log("[debug] before:e.currentTarget.dataset.index", e.currentTarget.dataset.index)
      console.log("[debug] before:this.data.curSelected", this.data.curSelected)
      let key = Number(e.currentTarget.dataset.index);
      console.log("[debug] before:key", key)
      
      let tabList = this.data.tabList;
      let curSelected= this.data.curSelected;
      
      if(curSelected != key){
        this.setData({
          curSelected:key
        });
        wx.switchTab({
          url: `/${tabList[key].pagePath}`,
        })
      }
      console.log("[debug] after:e.currentTarget.dataset.index", e.currentTarget.dataset.index)
      console.log("[debug] after:this.data.curSelected", this.data.curSelected)
      console.log("[debug] after:key", key)
      
    },
    
  }
})