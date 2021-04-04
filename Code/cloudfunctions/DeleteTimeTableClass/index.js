// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.ClassID)){
    console.log("[数据库] [删除数据] Delete TimeTableClass FAIL: 参数不足", event);
    // 传入的参数不足
    return {};
  }
  const db = cloud.database();
  const _ = db.command;
  var ObjList, TableIDList = [];
  await db.collection('TimeTableClass_TimeTable_Relation').where({
    ClassID: event.ClassID
  }).field({
    TableID: true,
    _id:true
  }).get().then(res => {
    ObjList = res.data;
    console.log("[DEBUG]: ObjList: ", ObjList, typeof(ObjList));
    for(i in ObjList){
      TableIDList.push(ObjList[i]["TableID"]);
    }
    console.log("[DEBUG]: TableList: ", TableIDList);
  })

  // 一共有四张表中相关的数据要被删除
  // TimeTableClass 属于某个 User 的关系
  db.collection('User_TimeTableClass_Relation').where({
    ClassID: event.ClassID
  }).remove().then(res => {
    console.log("[数据库] [删除数据] Delete TimeTableClass in User_TimeTableClass_Relation SUCCESS", res);
  })
  // TimeTableClass本身
  db.collection('TimeTableClass').where({
    _id: event.ClassID
  }).remove().then(res => {
    console.log("[数据库] [删除数据] Delete TimeTableClass in TimeTableClass SUCCESS", res);
  })
  // 相关TimeTable和参与用户的关系表
  db.collection('TimeTable_Member_Relation').where({
    TableID: _.in(TableIDList)
  }).remove().then(res => {
    console.log("[数据库] [删除数据] Delete TimeTableClass related TimeTable in TimeTable_Member_Relation SUCCESS", res);
  })
  // 相关TimeTable本身
  db.collection('TimeTable').where({
    _id: event.ClassID
  }).remove().then(res => {
    console.log("[数据库] [删除数据] Delete TimeTableClass related TimeTable in TimeTable SUCCESS", res);
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}