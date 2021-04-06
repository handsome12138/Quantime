// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // All in One
  // 受限于只能有10个云函数的设定，所以使用若干个if else在一个云函数里实现所有的功能，通过event.FuncName做判断
  if(typeof(event.FuncName) == "undefined"){
    console.log("[云函数] All in One ERROR： 未指定FuncName");
    return {}
  }
  if(event.FuncName == "AddTimeTable"){

  }else if(event.FuncName == "AddTimeTableClass"){
    
  }else if(event.FuncName == "AlterTimeSelected"){
    
  }else if(event.FuncName == "AlterTimeTableBelong"){
    
  }else if(event.FuncName == "AlterTimeTableInfo"){
    
  }else if(event.FuncName == "DeleteTimeTable"){

  }else if(event.FuncName == "DeleteTimeTableClass"){

  }else if(event.FuncName == "JoinTimeTable"){

  } 
  console.log("[云函数] All in One ERROR： FuncName 未定义");
  return {}
}