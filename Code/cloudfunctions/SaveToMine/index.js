// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.TableID)){
    console.log("[数据库] [修改数据] SaveToMine FAIL: 参数不足" );
    // 传入的参数不足
    return {};
  }
  const db = cloud.database();
  var AlreadyIn = 0;
  await db.collection('TimeTable_Save_Relation').where({
    TableID: event.TableID,
    UserID: wxContext.OPENID
  }).get().then(res => {
    if(res.data.length > 0){
      AlreadyIn = 1;
    }else{
      db.collection('TimeTable_Save_Relation').add({
        data:{
          TableID: event.TableID,
          UserID: wxContext.OPENID
        }
      })
    }
  })
  
  return {
    AlreadyIn,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}