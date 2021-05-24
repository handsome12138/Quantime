// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.TableID)){
    console.log("[数据库] [修改数据] Alter Time Chosen in TimeTable-Member-Relation FAIL: 参数不足" );
    // 传入的参数不足
    return {};
  }
  const db = cloud.database();
  var UpdData = {}
  if(typeof(event.NewStatus) != "undefined"){    UpdData["Status"] = event.NewStatus;   }
  if(typeof(event.NewContext) != "undefined"){    UpdData["Context"] = event.NewContext;   }
  if(typeof(event.NewSave) != "undefined"){    UpdData["Save"] = event.NewSave;   }
  if(typeof(event.NewClassID) != "undefined"){    UpdData["ClassID"] = event.NewClassID;   }
  if(typeof(event.NewAvaliable) != "undefined"){    UpdData["Avaliable"] = event.NewAvaliable;   }
  db.collection('TimeTable').doc(event.TableID).update({
    data: UpdData
  }).then(res => {
    console.log("[数据库] [修改数据] Alter TimeTable Status SUCCESS , res = ", res );
  });    
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}