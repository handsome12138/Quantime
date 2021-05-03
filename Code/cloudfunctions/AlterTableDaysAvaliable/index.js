// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.TableID && event.Avaliable)){
    // 传入的参数不足
    console.log("[数据库] [新增数据] AlterTableDaysAvaliable FAIL: 参数不足", event);
    return {info:'error 参数不足', event:event};
  }
  const db = cloud.database();
  db.collection('TimeTable').where({
    _id: event.TableID
  }).update({
    data:{
      Avaliable: event.Avaliable
    }
  })
  return {
    event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}