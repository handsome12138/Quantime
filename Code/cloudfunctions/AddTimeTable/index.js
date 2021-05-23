// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  if(!(event.Name && (typeof(event.Status)!="undefined") && (typeof(event.Save)!="undefined") && event.Context && event.BelongClassID && event.Days)){
    // 传入的参数不足
    console.log("[数据库] [新增数据] TimeTable FAIL: 参数不足", event);
    return {info:'error 参数不足', event:event};
  }
  var T = new Date();
  var CreateTime = T.getFullYear() + '-' + (T.getMonth()+1) + '-' + T.getDate();
  var addres;
  var Avaliable = [];
  for(var idx in event.Days){
    var obj = {
      date: event.Days[idx],
      choose: Array(24).fill(0)
    }
    Avaliable.push(obj);
  }
  await db.collection('TimeTable').add({
    data: {
      Name: event.Name,
      Context: event.Context,
      Status: event.Status,
      Days: event.Days,
      CreateTime: CreateTime,
      ClassID: event.BelongClassID,
      Avaliable: Avaliable,
      Save: Save
    },
  }).catch(res => {
    console.log("[数据库] [新增数据] TimeTable FAIL: ", res);
  }).then(res =>{
    // 回调里才有TableID
    addres = res._id;
    console.log("[数据库] [新增数据] TimeTable SUCCESS res = ", res);    
  })

  

  return {
    id: addres,
    event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}