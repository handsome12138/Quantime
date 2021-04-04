// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.TableID)){
    console.log("[数据库] [删除数据] Delete TimeTable FAIL: 参数不足", event);
    // 传入的参数不足
    return {};
  }
  const db = cloud.database();
  db.collection('TimeTableClass_TimeTable_Relation').where({
    TableID: event.TableID
  }).remove().then(res => {
    console.log("[数据库] [删除数据] Delete TimeTableClass_TimeTable_Relation SUCCESS: ", res);
  })
  db.collection('TimeTable').where({
    _id: event.TableID
  }).remove().then(res => {
    console.log("[数据库] [删除数据] Delete TimeTable SUCCESS: ", res);
  })
  db.collection('TimeTable_Member_Relation').where({
    TableID: event.TableID
  }).remove().then(res => {
    console.log("[数据库] [删除数据] Delete TimeTable_Member_Relation SUCCESS: ", res);
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}