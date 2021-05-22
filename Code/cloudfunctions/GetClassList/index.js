// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  var ClassNameList = [], ClassIDList = [];
  var ClassList = [];
  await db.collection('TimeTableClass').where({
    OpenID: wxContext.OPENID
  }).get().then(res => {
    // console.log('[db]GetClassList res=', res.data);
    ClassList = res.data;
    for(var ClassObj of res.data){
      ClassNameList.push(ClassObj.ClassName);
      ClassIDList.push(ClassObj._id);
    }
  })
  // console.log('[db]GetClassList', ClassNameList, ClassIDList);
  return {
    ClassList,
    ClassNameList,
    ClassIDList,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}