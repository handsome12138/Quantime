// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  if(!(event.OpenID)){
    // 传入的参数不足
    console.log("[数据库] [获取数据] GetTableInfo FAIL: 参数不足", event);
    return {};
  }
  
  var tblist = [];
  db.collection('TimeTableClass').where({
    OpenID: event.OpenID
  }).get().then(res => {
    console.log("[数据库] [获取数据] [debug] GetTableInfo Class表", res);
    for(var TClass of res.data){
      var obj = {"ClassID": TClass._id, "ClassName": TClass.ClassName, "TimeTables": []};
      db.collection('TimeTable').where({
        _id: TClass._id
      }).get().then(res =>{
        obj["TimeTables"].push(res.data);
      })
      tblist.push(obj);
    }
    console.log("[数据库] [获取数据] [debug] GetTableInfo 返回值", tblist);
  })

  return {
    tblist
  }
}