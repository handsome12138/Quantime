// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.ClassName)){
    // 传入的参数不足
    console.log("[数据库] [新增数据] TimeTable FAIL: 参数不足", event);
    return {event: event};
  }
  var ClassName = event.ClassName;
  var id = '';
  // console.log('Here is AddTimeTableClass');
  const db = cloud.database()
  await db.collection('TimeTableClass').add({
    data: {
      ClassName: ClassName,
      OpenID: wxContext.OPENID
    },
  }).then( res => {
    console.log("[数据库] [新增记录] [成功] TimeTableClass res = ", res);
    id = res._id;
  });
  return {
    event,
    id
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}