// components/MyTabbar/MyTabbar.js
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
    PageCur: 'time', // time or mine
    // accessReady:true,
    // userInfo:[],
    // hasUserInfo:false,
    // usrid: "test_usrid",
    // elements: [],
    // usrss: [],
    // openid: null,
    // usrid 应该通过接口获取后setdata
  },

  /**
   * 组件的方法列表
   */
  methods: {
    NavChange(e) {
      this.setData({
        PageCur: e.currentTarget.dataset.cur
      })
    },
  }
})
