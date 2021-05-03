// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // if(!(event.TableID && event.UserID)){
    //   console.log("[数据库] [新增数据] TimeTable-Member-Relation FAIL: 参数不足" );
    //   // 传入的参数不足
    //   return {};
  // }
  if(!(event.TableID)){
    console.log("[数据库] [新增数据] TimeTable-Member-Relation FAIL: 参数不足" );
    // 传入的参数不足
    return {event:event, info:"参数不足", status:2};
  }
  const db = cloud.database()
  var flag = 0;
  var OpenID = wxContext.OPENID;
  await db.collection('TimeTable_Member_Relation').where({
    TableID: event.TableID,
    UserID: OpenID, //Open ID
  }).get().then(res => {
    // console.log("debug: ", res.data);
    if(res.data.length){
      console.log("[数据库] [新增数据] TimeTable-Member-Relation FAIL: already in , res = ", res );
      flag = 1;
    }
  })
  if(flag == 1){
    return {info:"Already Exist", status: 1};
  }
  // 强行同步执行
  await db.collection('TimeTable_Member_Relation').add({
    data: {
      TableID: event.TableID,
      UserID: OpenID, //Open ID
      SelectTime: [],
    }
  }).then(res => {
    console.log("[数据库] [新增数据] TimeTable-Member-Relation SUCCESS res = ", res);
  })

  return {
    event: event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
    status: 0
  }
}