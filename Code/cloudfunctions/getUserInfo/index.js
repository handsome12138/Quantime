// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  let HasUserInfo = true, NickName = '', avatarURL = '';
  await db.collection('User').where({
      OpenID: wxContext.OPENID
    }).get().then(res => {
    if(res.data.length > 0){
      NickName = res.data[0].NickName;
      avatarURL = res.data[0].avatarURL;
    }else{
      HasUserInfo = false;
    }
  })
  return {
    HasUserInfo,
    NickName,
    avatarURL,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
