const app = getApp();
// pages/Form/Form.js
// 引入插件安装器
import plugin from '../../3partylib/wx_calendar/plugins/index'
// 引入所需插件
import todo from '../../3partylib/wx_calendar/plugins/todo'
import selectable from '../../3partylib/wx_calendar/plugins/selectable'

// 按需安装插件，支持链式调用
plugin.use(todo)
      .use(selectable)
// let calendar = null ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ClassIDList: [],
    ClassNameList: [],
    ClassIndex: 0,
    TableName: '',
    TableContext: '',
    option_classify: [
      { text: '分类1', value: 0 },
      { text: '分类2', value: 1 },
      { text: '分类3', value: 2 },
    ],
    value_classify: 0,
    
    //小历同学组件手册https://treadpit.github.io/wx_calendar/v2/guide.html
    calendarConfig: {
      multi: true, // 是否开启多选,
      weekMode: false, // 周视图模式
      theme: 'elegant', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题在 theme 文件夹扩展
      // markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      preventSwipe: true, // 是否禁用日历滑动切换月份
      firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
    },
    modalName:null,

    CustomBar: app.globalData.CustomBar,
    checkbox: [{
      value: 0,
      name: '10元',
      checked: false,
      hot: false,
    }, {
      value: 1,
      name: '20元',
      checked: true,
      hot: false,
    }, {
      value: 2,
      name: '30元',
      checked: true,
      hot: true,
    }, {
      value: 3,
      name: '60元',
      checked: false,
      hot: true,
    }, {
      value: 4,
      name: '80元',
      checked: false,
      hot: false,
    }, {
      value: 5,
      name: '100元',
      checked: false,
      hot: false,
    }]
  },


  /**
   * testGetCalendar:测试日历获取
   */
  testGetCalendar(e){
    const calendar = this.selectComponent('#calendar').calendar
    
    const selectedDay = calendar.getSelectedDates(calendar)
    console.log("[debug] 测试日历获取:",selectedDay)
  },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
    console.log('[debug] afterCalendarRender', e)
    // calendar = e;
    // console.log('[debug] this.canlendar', this.canlendar)
  },
  /**
   * 日期点击事件（此事件会完全接管点击事件），需自定义配置 takeoverTap 值为真才能生效
   * currentSelect 当前点击的日期
   */
  takeoverTap(e) {
    console.log('takeoverTap', e.detail) // => { year: 2019, month: 12, date: 3, ...}
    // console.log('[debug] this.canlendar', this.canlendar)
  },
  /**
   * 选择日期后执行的事件
   */
  afterTapDate(e) {
    let enableDays=[]
    // console.log('afterTapDate', e.detail) // => { year: 2019, month: 12, date: 3, ...}
    // const component = this.selectComponent('#calendar')
    const calendar = this.selectComponent('#calendar').calendar
    // console.log("[debug] component:",component)
    // console.log("[debug] calendar:",calendar)
    const selectedDay = calendar.getSelectedDates(calendar)
    const data = this.selectComponent('#calendar').__data__
    // console.log("[debug] 日历实例获取:",this.selectComponent('#calendar'))

    // console.log("[debug] 日历实例数据获取结果:",data)
    const selectDates = data.calendar.selectedDates
    // console.log("[debug] 选中的日期:",selectDates)
    // console.log("[debug] selectedDay:",selectedDay)
    const dates = data.calendar.dates
    let array = selectDates
    // console.log("[debug] array:",array)

    if(selectedDay.length < 3){//选中不足三个
      // enableDays.push(''+e.detail.year+'-'+e.detail.month+'-'+e.detail.date)
      // console.log("[debug] enableDays:",enableDays)
      // calendar.enableArea(['2018-11-12', '2018-11-30'])
      const calendar = this.selectComponent('#calendar').calendar
      // calendar.enableArea([])
    }
    else if(selectedDay.length == 3){//选中三个
      for(let i=0;i<3;i++){
        let iday = selectedDay[i]
        enableDays.push(''+iday.year+'-'+iday.month+'-'+iday.date)
      }
      // console.log("[debug] enableDays:",enableDays)
      // calendar.enableArea([])
      // calendar.enableDates(enableDays)
    }
    else{
      const cancelDates = [//选中超过三个
        {
          year: selectedDay[3].year,
          month: selectedDay[3].month,
          date: selectedDay[3].date
        }
      ]
      // console.log("[debug] cancelDates",cancelDates)
      calendar.cancelSelectedDates(cancelDates)//将选中的取消
      wx.showToast({
        title: '最多选择三天',
        icon: 'none',
        duration: 2000
      })
      
    }
    
  },
  /**
   * 当日历滑动时触发
   */
  onSwipe(e) {
    console.log('onSwipe', e.detail)
  },
  /**
   * 当日历滑动时触发(适用于周视图)
   * 可在滑动时按需在该方法内获取当前日历的一些数据
   */
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail)
  },
  /**
   * 当改变月份时触发
   * => current 当前年月 / next 切换后的年月
   */
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail)
    // => { current: { month: 3, ... }, next: { month: 4, ... }}
  },

  showModal(e) {
    console.log(e.currentTarget.dataset.target)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'GetClassList'
    }).then(res=>{
      console.log('[debug] Form Clist', res);
      this.setData({
        ClassIDList: res.result.ClassIDList,
        ClassNameList: res.result.ClassNameList
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("渲染完成calendarConfig:",this.data.calendarConfig)
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("[debug] 显示calendarConfig:",this.data.calendarConfig)
    // calendar = this.selectComponent('.calendar')
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onrefresh:function(){

    wx.showToast({

       title: '开始重新渲染',

       icon: 'success',

       duration: 2000

       });

   this.onLoad();

},//在onrefresh中完成重新渲染
submit_next:function(){
  const calendar = this.selectComponent('#calendar').calendar
  const selectedDay = calendar.getSelectedDates(calendar)
  if(this.data.ClassNameList.length == 0){
    wx.showToast({
      title: '请去 我的信息->类管理中创建类别',
    });
    return;
  }
  if(this.data.TableName.length == 0){
    wx.showToast({
      title: '请填写标题',
    });
    return;
  }
  if(this.data.TableContext.length == 0){
    wx.showToast({
      title: '请填写简介',
    });
    return;
  }
  if(selectedDay.length == 0){
    wx.showToast({
      title: '请选择日期',
    });
    return ;
  }

  var SelecteDayList = [];
  for(var day of selectedDay){
    SelecteDayList.push(day.year + '-' + day.month + '-' + day.date);
  }
  console.log('[debug]Form submit', SelecteDayList);
  wx.cloud.callFunction({
    name: 'AddTimeTable',
    data:{
      Name: this.data.TableName,
      Status: 0,
      Context: this.data.TableContext,
      BelongClassID: this.data.ClassIDList[this.data.ClassIndex],
      Days: SelecteDayList,
      Save: 1
    }
  }).then(res => {
    console.log('[debug] Form.js call AddTable', res);
    wx.navigateTo({
      url: '/pages/TimePublish/TimePublish?TableID='+res.result.id+'&control=1',
    })
  })
  
}
})