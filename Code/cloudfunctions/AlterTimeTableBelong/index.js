// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.TableID && event.NewBelongClassID)){
    console.log("[数据库] [修改数据] Alter TimeTable Belong in TimeTableClass-TimeTable-Relation FAIL: 参数不足", event);
    // 传入的参数不足
    return {};
  }
  const db = cloud.database();
  var flag = 0;
  // 先在TimeTableClass中确认ClassID是存在的
  await db.collection('TimeTableClass').where({
    _id: event.NewBelongClassID
  }).get().then(res => {
    // console.log("[DEBUG]: ", res)
    if( !res.data.length){
      console.log("[数据库] [修改数据] Alter TimeTable Belong in TimeTableClass-TimeTable-Relation FAIL: ClassID 不存在", event.ClassID );
      flag = 1;
    }
  })
  if(flag == 1){
    return {};
  }

  await db.collection('TimeTableClass_TimeTable_Relation').where({
    TableID: event.TableID
  }).update({
    data: {
      ClassID: event.NewBelongClassID
    }
  }).then(res => {
    console.log("[数据库] [修改数据] Alter TimeTable Belong in TimeTableClass-TimeTable-Relation SUCCESS, ", res );
  });    
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}