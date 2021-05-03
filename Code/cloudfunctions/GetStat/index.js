// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.TableID)){
    // 传入的参数不足
    console.log("[数据库] [获取数据] GetStat FAIL: 参数不足", event);
    return {'info': 'error: 参数不足', 'event': event};
  }

  const db = cloud.database();
  var TableInfo, JoinInfo;
  await db.collection('TimeTable').where({
    _id: event.TableID
  }).get().then(res => {
    console.log('[db]GetStat Tb data', res);
    TableInfo = res.data[0]
  })

  db.collection('TimeTable_Member_Relation').where({
    TableID: event.TableID
  }).get().then(res=>{
    JoinInfo = res.data;
  })

  return {
    JoinInfo,
    TableInfo,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}