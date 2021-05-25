// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!(event.NickName) || !(event.avatarURL)){
    console.log('UserRegister 参数不足');
    return { event }
  }
  const db = cloud.database();

  db.collection('User').where({
    OpenID: wxContext.OPENID
  }).get().then(res => {
    console.log('Login check res', res)
    if(res.data.length > 0){
      db.collection('User').where({
        'OpenID': wxContext.OPENID, //OpenID
      }).update({
        data:{
          'avatarURL': event.avatarURL,
          'NickName': event.NickName
        }
      });
    }else{
      db.collection('User').add({
        data:{
          'OpenID': wxContext.OPENID, //OpenID
          'avatarURL': event.avatarURL,
          'NickName': event.NickName
        }
      });
      // 创建默认类
      db.collection('TimeTableClass').add({
        data: {
          ClassName: '默认',
          OpenID: wxContext.OPENID
        },
      })
    }
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}