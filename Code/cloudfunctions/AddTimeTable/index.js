// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  if(!(event.Name && (typeof(event.Status)!="undefined") && event.Context && event.BelongClassID)){
    // 传入的参数不足
    console.log("[数据库] [新增数据] TimeTable FAIL: 参数不足", event);
    return {};
  }
  var T = new Date();
  var CreateTime = T.getFullYear() + '-' + (T.getMonth()+1) + '-' + T.getDate();
  db.collection('TimeTable').add({
    data: {
      Name: event.Name,
      Context: event.Context,
      Status: event.Status,
      Days: [],
      CreateTime: CreateTime
    },
  }).catch(res => {
    console.log("[数据库] [新增数据] TimeTable FAIL: ", res);
  }).then(res =>{
    // 回调里才有TableID
    console.log("[数据库] [新增数据] TimeTable SUCCESS res = ", res);
    // 新增关系
    db.collection('TimeTableClass_TimeTable_Relation').add({
      data: {
        ClassID: event.BelongClassID,
        TableID: res._id
      }
    }).catch(res => {
      console.log("[数据库] [新增数据] TimeTable FAIL: ", res);
    }).then(res => {
      console.log("[数据库] [新增数据] TimeTableClass-TimeTable-Relation SUCCESS res = ", res)
    })
  })

  

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}