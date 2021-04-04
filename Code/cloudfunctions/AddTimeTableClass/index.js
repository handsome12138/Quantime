// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var ClassName = event.ClassName;
  console.log('Here is AddTimeTableClass');
  const db = cloud.database()
  db.collection('TimeTableClass').add({
    data: {
      ClassName: ClassName
    },
  }).then( res => {
    console.log("[数据库] [新增记录] [成功] TimeTableClass res = ", res);
    db.collection('User_TimeTableClass_Relation').add({
      data: {
        UserID: wxContext.OPENID,
        ClassID: res._id
      }
    }).then(res => {
      console.log("[数据库] [新增记录] [成功] User_TimeTableClass_Relation res = ", res);
    })
  });
  return {
    // event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}