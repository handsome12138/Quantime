// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'development-7g9q612v12e4c773'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.TableID && event.UserID && event.SelectTime)){
    console.log("[数据库] [修改数据] Alter Time Chosen in TimeTable-Member-Relation FAIL: 参数不足" );
    // 传入的参数不足
    return {};
  }
  const db = cloud.database()
  var RelationID, flag;
  await db.collection('TimeTable_Member_Relation').where({
    TableID: event.TableID,
    UserID: event.UserID, //Open ID
  }).get().then(res => {
    // console.log("debug: ", res.data);
    if(res.data.length == 0){
      console.log("[数据库] [修改数据] Alter Time Chosen in TimeTable-Member-Relation FAIL 未加入 , res = ", res );
      flag = 1;
    }else{
      RelationID = res.data[0]._id;
      console.log("[DEBUG]: ID = ", RelationID);
      // db.collection('counters').doc(RelationID).update({
      db.collection('TimeTable_Member_Relation').doc(RelationID).update({
        data: {
            SelectTime: event.SelectTime
          }
      }).then(res => {
        console.log("[数据库] [修改数据] Alter Time Chosen in TimeTable-Member-Relation SUCCESS , res = ", res );
      });    
    }
  })
  if(flag == 1){
    return "Relation Not Exist";
  }
  
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}