// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
function addarray(array1, array2){
  // 这里会过滤掉-1
  for(var idx in array2){
    if(array2[idx] > 0){
      array1[idx] += array2[idx];
    }
  }
  return array1;
}
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.TableID)){
    // 传入的参数不足
    console.log("[数据库] [获取数据] GetStat FAIL: 参数不足", event);
    return {'info': 'error: 参数不足', 'event': event};
  }

  const db = cloud.database();
  var TableInfo, JoinInfo, idx, UserObj = {}, PeopleCount = [];
  await db.collection('TimeTable').where({
    _id: event.TableID
  }).get().then(res => {
    console.log('[db]GetStat Tb data', res);
    TableInfo = res.data[0]
  })
  // var UserIDList = [];
  await db.collection('TimeTable_Member_Relation').where({
    TableID: event.TableID
  }).get().then(res=>{
    console.log('debug GetStat JoinInfo=', res.data);
    JoinInfo = res.data;
    for(var joinidx in res.data){
      db.collection('User').where({
        OpenID: res.data[joinidx].UserID
      }).field({
        avatarURL: true,
        NickName: true,
      }).get().then(res2 => {
        UserObj[ JoinInfo[joinidx].UserID ] = res2.data[0];
      })
    }
  })
  for(var t in TableInfo.Days){
    PeopleCount.push({
        Stat: Array(24).fill(0),
        Date: TableInfo.Days[t]
    });
  }
  for(var join of JoinInfo){
    for(idx in PeopleCount){
      PeopleCount[idx].Stat = addarray(PeopleCount[idx].Stat, join.SelectTime[idx])
    }
  }
  return {
    PeopleCount,
    UserObj,
    JoinInfo,
    TableInfo,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}