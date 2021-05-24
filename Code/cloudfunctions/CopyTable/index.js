// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  if(!(event.TableID) || !(event.ClassID)){
    // 传入的参数不足
    console.log("[数据库] [新增数据] CopyTable FAIL: 参数不足", event);
    return {info:'error 参数不足', event:event};
  }
  db.collection('TimeTable').doc(event.TableID).get().then(res => {
    console.log('Copy Table', res);
    res.data.Name = res.data.Name + '-copy';
    res.data.ClassID = event.ClassID;
    delete(res.data._id);
    db.collection('TimeTable').add({
      data:res.data
    }).then(res2 => {
      console.log('Copy Table success', res2)
    })
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}