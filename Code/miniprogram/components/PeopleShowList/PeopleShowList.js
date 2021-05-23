// components/PeopleShowList/PeopleShowList.js
import pinyin from 'wl-pinyin';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    JoinInfo:{
      type: 'list',
      value: []
    },
    Select: {
      type: Boolean,
      value: false
    },
    SelectDay: {
      type: 'int',
      value: 0
    },
    SelectHour: {
      type: 'int',
      value: 0
    },
    Filter:{
      type: Boolean,
      value: false
    },
    FilterSet:{
      type: Set,
      value: new Set()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    EmptyContactObj:{
      '#': [],
      'A': [],
      'B': [],
      'C': [],
      'D': [],
      'E': [],
      'F': [],
      'G': [],
      'H': [],
      'I': [],
      'J': [],
      'K': [],
      'L': [],
      'M': [],
      'N': [],
      'O': [],
      'P': [],
      'Q': [],
      'R': [],
      'S': [],
      'T': [],
      'U': [],
      'V': [],
      'W': [],
      'X': [],
      'Y': [],
      'Z': []
    },
    ToFillContactObj:{
    },
    EmptyContactList: [
      {kind: '#', entitys: []},
      {kind: 'A', entitys: []},
      {kind: 'B', entitys: []},
      {kind: 'C', entitys: []},
      {kind: 'D', entitys: []},
      {kind: 'E', entitys: []},
      {kind: 'F', entitys: []},
      {kind: 'G', entitys: []},
      {kind: 'H', entitys: []},
      {kind: 'I', entitys: []},
      {kind: 'J', entitys: []},
      {kind: 'K', entitys: []},
      {kind: 'L', entitys: []},
      {kind: 'M', entitys: []},
      {kind: 'N', entitys: []},
      {kind: 'O', entitys: []},
      {kind: 'P', entitys: []},
      {kind: 'Q', entitys: []},
      {kind: 'R', entitys: []},
      {kind: 'S', entitys: []},
      {kind: 'T', entitys: []},
      {kind: 'U', entitys: []},
      {kind: 'V', entitys: []},
      {kind: 'W', entitys: []},
      {kind: 'X', entitys: []},
      {kind: 'Y', entitys: []},
      {kind: 'Z', entitys: []},
    ],
    windowHeight: 0,
    NowPeopleCount:[
    ],
    SelectPeopleCount:[
      {
        Date:"2020.4.3",
        Stat:[2,3,4,5,0,0,0,0,9,0,11,0,0,0,0,0,17,18,0,20,21,22,23,0]
      },
      {
        Date:"2020.4.4",
        Stat:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,21,22,23,0]
      },
      {
        Date:"2020.4.5",
        Stat:[0,0,0,0,0,0,0,8,9,10,0,0,0,0,0,0,0,0,0,0,0,0,23,0]
      }
    ],
    TotalPeopleCount:[
      {
        Date:"2020.4.3",
        Stat:[0,0,0,0,0,6,0,0,9,0,11,0,0,0,0,0,17,18,0,20,21,22,23,0]
      },
      {
        Date:"2020.4.4",
        Stat:[0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,20,21,22,23,0]
      },
      {
        Date:"2020.4.5",
        Stat:[0,0,0,0,0,0,0,8,9,10,0,0,0,0,0,0,0,0,0,0,0,0,23,0]
      }
    ],
    contactsList: [
      {
        "kind": "1",
        "entitys": [
          {
            "id": 889,
            "managerCode": "785868",
            "initial": "1",
            "name": "1221",
            "gender": 1,
            "checked": false
          }
        ]
      },
      {
        "kind": "C",
        "entitys": [
          {
            "id": 845,
            "managerCode": "105050",
            "initial": "C",
            "name": "测试姓名",
            "gender": 0,
            "checked": false
          },
          {
            "id": 884,
            "managerCode": "999996",
            "initial": "C",
            "name": "册",
            "gender": 1,
            "checked": false
          },
          {
            "id": 844,
            "managerCode": "000123",
            "initial": "C",
            "name": "测试员工",
            "gender": 1,
            "checked": false
          }
        ]
      },
      {
        "kind": "G",
        "entitys": [
          {
            "id": 912,
            "managerCode": "400414",
            "initial": "G",
            "name": "高小阔",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1045,
            "managerCode": "547566",
            "initial": "G",
            "name": "高阔入职",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1100,
            "managerCode": "000989",
            "initial": "G",
            "name": "高德钊",
            "gender": 1,
            "checked": false
          }
        ]
      },
      {
        "kind": "H",
        "entitys": [
          {
            "id": 1050,
            "managerCode": "101309",
            "initial": "H",
            "name": "红色",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1051,
            "managerCode": "108525",
            "initial": "H",
            "name": "红星",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1096,
            "managerCode": "123123",
            "initial": "H",
            "name": "洪烽杰",
            "gender": 0,
            "checked": false
          }
        ]
      },
      {
        "kind": "L",
        "entitys": [
          {
            "id": 779,
            "managerCode": "000929",
            "initial": "L",
            "name": "李帅",
            "gender": 1,
            "checked": false
          },
          {
            "id": 852,
            "managerCode": "101507",
            "initial": "L",
            "name": "刘菲菲",
            "gender": 0,
            "checked": false
          },
          {
            "id": 1046,
            "managerCode": "441486",
            "initial": "L",
            "name": "ll",
            "gender": 1,
            "checked": false
          },
          {
            "id": 919,
            "managerCode": "454554",
            "initial": "L",
            "name": "李媛媛",
            "gender": 1,
            "checked": false
          },
          {
            "id": 920,
            "managerCode": "100900",
            "initial": "L",
            "name": "李多鹅",
            "gender": 0,
            "checked": false
          },
          {
            "id": 1055,
            "managerCode": "100852",
            "initial": "L",
            "name": "李三三",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1090,
            "managerCode": "082929",
            "initial": "L",
            "name": "娄馨予",
            "gender": 1,
            "checked": false
          }
        ]
      },
      {
        "kind": "P",
        "entitys": [
          {
            "id": 848,
            "managerCode": "000937",
            "initial": "P",
            "name": "潘仲慧",
            "gender": 0,
            "checked": false
          },
          {
            "id": 1098,
            "managerCode": "1",
            "initial": "P",
            "name": "彭于晏",
            "gender": 1,
            "checked": false
          }
        ]
      },
      {
        "kind": "T",
        "entitys": [
          {
            "id": 842,
            "managerCode": "989898",
            "initial": "T",
            "name": "test",
            "gender": 1,
            "checked": false
          }
        ]
      },
      {
        "kind": "W",
        "entitys": [
          {
            "id": 104,
            "managerCode": "000132",
            "initial": "W",
            "name": "王洪磊",
            "gender": 1,
            "checked": false
          },
          {
            "id": 871,
            "managerCode": "000950",
            "initial": "W",
            "name": "王小7",
            "gender": 0,
            "checked": false
          },
          {
            "id": 878,
            "managerCode": "000959",
            "initial": "W",
            "name": "王小黑修改2",
            "gender": 1,
            "checked": false
          },
          {
            "id": 24,
            "managerCode": "580093",
            "initial": "W",
            "name": "王名嫱",
            "gender": 0,
            "checked": false
          },
          {
            "id": 777,
            "managerCode": "101385",
            "initial": "W",
            "name": "王凤婷",
            "gender": 0,
            "checked": false
          },
          {
            "id": 853,
            "managerCode": "000999",
            "initial": "W",
            "name": "王橘子",
            "gender": 1,
            "checked": false
          },
          {
            "id": 863,
            "managerCode": "00947",
            "initial": "W",
            "name": "王宗祥",
            "gender": 1,
            "checked": false
          },
          {
            "id": 864,
            "managerCode": "000949",
            "initial": "W",
            "name": "魏金越",
            "gender": 0,
            "checked": false
          },
          {
            "id": 866,
            "managerCode": "222211",
            "initial": "W",
            "name": "王励勤",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1072,
            "managerCode": "188188",
            "initial": "W",
            "name": "王多余",
            "gender": 0,
            "checked": false
          }
        ]
      },
      {
        "kind": "X",
        "entitys": [
          {
            "id": 847,
            "managerCode": "000935",
            "initial": "X",
            "name": "解雨薇",
            "gender": 0,
            "checked": false
          },
          {
            "id": 1087,
            "managerCode": "000778",
            "initial": "X",
            "name": "谢广坤",
            "gender": 0,
            "checked": false
          }
        ]
      },
      {
        "kind": "Y",
        "entitys": [
          {
            "id": 1081,
            "managerCode": "000987",
            "initial": "Y",
            "name": "杨鑫雨",
            "gender": 0,
            "checked": false
          },
          {
            "id": 1094,
            "managerCode": "001111",
            "initial": "Y",
            "name": "于晓媚",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1097,
            "managerCode": "0018306",
            "initial": "Y",
            "name": "杨冬雪",
            "gender": 0,
            "checked": false
          },
          {
            "id": 1093,
            "managerCode": "001830",
            "initial": "Y",
            "name": "杨冬雪",
            "gender": 0,
            "checked": false
          }
        ]
      },
      {
        "kind": "Z",
        "entitys": [
          {
            "id": 916,
            "managerCode": "852656",
            "initial": "Z",
            "name": "张王",
            "gender": 0,
            "checked": false
          },
          {
            "id": 1088,
            "managerCode": "000454",
            "initial": "Z",
            "name": "张庆封",
            "gender": 0,
            "checked": false
          },
          {
            "id": 1099,
            "managerCode": "000189",
            "initial": "Z",
            "name": "张春波",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1048,
            "managerCode": "101304",
            "initial": "Z",
            "name": "张三十",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1075,
            "managerCode": "000977",
            "initial": "Z",
            "name": "朱昱姿",
            "gender": 0,
            "checked": false
          },
          {
            "id": 1080,
            "managerCode": "000986",
            "initial": "Z",
            "name": "郑科",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1082,
            "managerCode": "000996",
            "initial": "Z",
            "name": "在大海边啊126",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1095,
            "managerCode": "000988",
            "initial": "Z",
            "name": "张廷宇",
            "gender": 1,
            "checked": false
          },
          {
            "id": 1063,
            "managerCode": "400401",
            "initial": "Z",
            "name": "张飞非",
            "gender": 1,
            "checked": false
          }
        ]
      }
    ], 
    toViewId: '', //scroll-view 跳转id
  },

  /**
   * 组件的方法列表
   */
  lifetimes:{
    created: function(){
      
      this.handleGetSystemInfo(this);
    },
    attached: function(){
      this.handleGetSystemInfo();
    }
  },
  methods: {
    handleGetSystemInfo(){
      let that = this;
      wx.getSystemInfo({
        success: (res) => {
          that.setData({
            windowHeight: res.windowHeight
          });
          // console.log('window height=', res.windowHeight, that.data.windowHeight)
        }
      })
    },
    handleLetterOrder(ev){
      this.setData({
        toViewId: ev.detail.id
      },()=>{
        // console.log('父-字母排序变化', this.data.toViewId, ev);
      });
    },
  },
  observers:{
    'JoinInfo'(JoinInfo){
      if( JoinInfo.length > 0){
        let SingleJoinInfo;
        for(SingleJoinInfo of this.data.JoinInfo){
          let IdxLetter = pinyin.getFirstLetter(SingleJoinInfo.NickName)[0].toLocaleUpperCase(); 
          if( IdxLetter <='Z' && IdxLetter >= 'A'){
            let setidx = "EmptyContactObj." + IdxLetter;
            let settarg = this.data.EmptyContactObj[IdxLetter];
            settarg.push(SingleJoinInfo)
            this.setData({
              [setidx]: settarg
            })
            // this.data.EmptyContactObj[IdxLetter].push(SingleJoinInfo)
          }else{
            let setidx = "EmptyContactObj.#";
            let settarg = this.data.EmptyContactObj['#'];
            settarg.push(SingleJoinInfo)
            this.setData({
              [setidx]: settarg
            })
            // this.data.EmptyContactObj['#'].push(SingleJoinInfo)
          }
        }
        // for(var idx = 0; idx<10;idx++){
        //   let setidx = "EmptyContactObj.Z";
        //   let settarg = this.data.EmptyContactObj.Z;
        //   settarg.push({NickName: 'test'+idx})
        //   this.setData({
        //     [setidx]: settarg
        //   })
        // }
        console.log('JoinInfo observer', this.data.SelectDay, this.data.SelectHour, JoinInfo, this.data.EmptyContactObj);
      }
    }
  }
})
