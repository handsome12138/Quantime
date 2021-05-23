// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  var $ = db.command.aggregate;
  var TableList = [];
  await db.collection('TimeTable_Save_Relation').aggregate().match({
    UserID: wxContext.OPENID
  }).lookup({
    from: 'TimeTable',
    localField: 'TableID',
    foreignField: '_id',
    as: 'TableInfo',
  }).replaceRoot({
    newRoot: $.mergeObjects([ $.arrayElemAt(['$TableInfo', 0]), '$$ROOT' ])
  }).project({
    TableInfo: 0
  }).end().then(res => {
    console.log('MySavedTable lookup here', res)
    TableList = res.list
  })
  .catch(err => console.error(err))

  return {
    TableList,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}