// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.NewStatus && event.TableID)){
    console.log("[数据库] [修改数据] Alter Time Chosen in TimeTable-Member-Relation FAIL: 参数不足" );
    // 传入的参数不足
    return {};
  }
  const db = cloud.database();
  db.collection('TimeTable').doc(event.TableID).update({
    data: {
        Status: event.NewStatus
      }
  }).then(res => {
    console.log("[数据库] [修改数据] Alter TimeTable Status SUCCESS , res = ", res );
  });    
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}