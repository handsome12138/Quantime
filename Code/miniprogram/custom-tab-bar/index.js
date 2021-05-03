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
      selected: 0,
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
      let key = Number(e.currentTarget.dataset.index);
      let tabList = this.data.tabList;
      let selected= this.data.selected;
      
      if(selected !== key){
        this.setData({
          selected:key
        });
        wx.switchTab({
          url: `/${tabList[key].pagePath}`,
        })
      }
    },
    
  }
})