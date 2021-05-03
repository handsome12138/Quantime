//app.js
App({
  globalData:{},
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'development-7g9q612v12e4c773',
        traceUser: true,
      })
    }
    // color ui 的全局导航栏组件
    // wx.getSystemInfo({
    //   success: e => {
    //     this.globalData.StatusBar = e.statusBarHeight;
    //     let custom = wx.getMenuButtonBoundingClientRect();
    //     this.globalData.Custom = custom;  
    //     this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    //   }
    // })
    // this.globalData = {}
    wx.cloud.callFunction({
      name: 'login',
      data: {
        // test:'test'
      }
    }).then(res =>{
      console.log('App.js call login:', res);
      this.globalData['openid'] = res.result.openid;
      this.globalData['RegisterStatus'] = res.result.RegisterStatus;
      this.globalData['avatarURL'] = res.result.avatarURL;
      this.globalData['NickName'] = res.result.NickName;
      this.globalData['hasUserInfo'] = (res.result.RegisterStatus == 1)
      if(res.result.RegisterStatus != 1){
        wx.redirectTo({
          url: '/pages/Login/Login',
        })
      }
      // console.log('App.js global data:', this.globalData);
    })
  }
})
