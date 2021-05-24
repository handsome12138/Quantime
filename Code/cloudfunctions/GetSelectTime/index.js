// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.TableID)){
    console.log("[数据库] [获取数据] GetSelectTime FAIL: 参数不足" );
    // 传入的参数不足
    return {info: '参数不足'};
  }
  const db = cloud.database()
  SelectTime = [];
  await db.collection('TimeTable').where({
    '_id': event.TableID //ID
  }).get().then(res=>{
    console.log('GetSelectTime', res)
    for(var idx in res.data[0].Days){
      SelectTime.push(res.data[0].Avaliable[idx].choose)
    }
    // return {
    //   event,
    //   SelectTime: SelectTime
    // }
  })
  console.log('SelectTime now = ', SelectTime);
  await db.collection('TimeTable_Member_Relation').where({
    TableID: event.TableID,
    UserID: wxContext.OPENID
  }).get().then(res => {
    console.log(res)
    if(res.data.length == 0  || res.data[0].SelectTime.length == 0){

    }else{
      SelectTime = res.data[0].SelectTime
    }
  })

  return {
    event,
    SelectTime,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}