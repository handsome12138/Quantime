// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  // if(!(event.OpenID)){
  //   // 传入的参数不足
  //   console.log("[数据库] [获取数据] GetTableInfo FAIL: 参数不足", event);
  //   return {'info': 'error: 参数不足', 'event': event, 'context': context};
  // }
  var OpenID = wxContext.OPENID;
  var tblist = [];
  var classlist = [];
  await db.collection('TimeTableClass').where({
    OpenID: OpenID
  }).get().then(res => {
    // console.log("[数据库] [获取数据] [debug] GetTableInfo Class表", res);
    classlist = res.data;
  })
  
  for(var TClass of classlist){
    var obj = {"ClassID": TClass._id, "ClassName": TClass.ClassName, "TimeTables": []};
    await db.collection('TimeTable').where({
      ClassID: TClass._id
    }).get().then(res =>{
      obj["TimeTables"] = res.data;
      tblist.push(obj);
    })
  }
  console.log("[数据库] [获取数据] [debug] GetTableInfo tblist", tblist);

  return {
    tblist: tblist,
    classlist: classlist,
    event: event
  }
}