var ws = require("nodejs-websocket");
var moment = require('moment');

console.log("开始建立连接...")

let users = [];
let conns = {};
let conns_invite = [];
let user_invite =[];
let groups = [];

// 广播函数
function boardcast(obj) {
  console.log("in broadcast: obj:",obj)
  // if(obj.bridge && obj.bridge.length){
  //   obj.bridge.forEach(item=>{
  //     conns[item].sendText(JSON.stringify(obj));
  //   })
  //   return;
  // }
  // //向群聊内成员广播信息
  // if (obj.groupId) {
  //   group = groups.filter(item=>{
  //     return item.id === obj.groupId
  //   })[0];
  //   group.users.forEach(item=>{
  //     conns[item.uid].sendText(JSON.stringify(obj));
  //   })
  //   return;
  // }

  //------------------------------------在干嘛？
  server.connections.forEach((conn, index) => {
      conn.sendText(JSON.stringify(obj));
  })
}

var server = ws.createServer(function(conn){
  console.log("在serve")
  conn.on("text", function (obj) {
    obj = JSON.parse(obj)

    if(obj.func === 'chat'){
      console.log("在chat")
      conns[''+obj.uid+''] = conn;
      console.log("in conn text,conns:",conns)

    //发送消息
    boardcast({
      //type: 2,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      msg: obj.msg,
      uid: obj.uid,
      nickname: obj.nickname,
      bridge: obj.bridge,
      func:'chat'
      //groupId: obj.groupId,
      //status: 1
    });
    //   switch(obj.type){
    //   // 创建连接
    //   case 1:
    //     console.log("in socket.js/case 1/obj:",obj)
    //     let isuser = users.some(item=>{
    //       return item.uid === obj.uid
    //     })
    //     if(!isuser){
    //       users.push({
    //         nickname: obj.nickname,
    //         uid: obj.uid,
    //         status: 1
    //       });
    //     } else {
    //       users.map((item, index)=>{
    //         if(item.uid === obj.uid){
    //           item.status = 1;
    //         }
    //         return item;
    //       })
    //     }
    //     boardcast({
    //       type: 1,
    //       date: moment().format('YYYY-MM-DD HH:mm:ss'),
    //       msg: obj.nickname+'加入聊天室',
    //       users: users,
    //       groups: groups,
    //       uid: obj.uid,
    //       nickname: obj.nickname,
    //       bridge: obj.bridge
    //     });
    //     break;
    //   // 注销
    //   case 2:
    //     // delete conns[''+obj.uid+''];
    //     users.map((item, index)=>{
    //       if(item.uid === obj.uid){
    //         item.status = 0;
    //       }
    //       return item;
    //     })
    //     boardcast({
    //       type: 1,
    //       date: moment().format('YYYY-MM-DD HH:mm:ss'),
    //       msg: obj.nickname+'退出了聊天室',
    //       users: users,
    //       groups: groups,
    //       uid: obj.uid,
    //       nickname: obj.nickname,
    //       bridge: []
    //     });
    //     break;
    //   // 发送消息
    //   default:
    //     console.log("in socket.js/case default/obj:",obj)
    //     boardcast({
    //       type: 2,
    //       date: moment().format('YYYY-MM-DD HH:mm:ss'),
    //       msg: obj.msg,
    //       uid: obj.uid,
    //       nickname: obj.nickname,
    //       bridge: obj.bridge,
    //       groupId: obj.groupId,
    //       status: 1
    //     });
    //     break;
    // } 
    }
    else if(obj.func ==='invite'){
    console.log('11进入invite了！')
      if(obj.func === 'invite'){
        console.log('22进入invite了！')
        conns_invite[''+obj.user+''] = conn;
        user_invite.push(obj.user)
        switch(obj.sender){
          case 'interviewer':
            //发送给特定面试者
            if(obj.condition !== 'initial'){
            console.log('进入interviewer了！')
            interviewee = user_invite.filter((item)=>{
              return item === obj.bridge[1];
            });
            console.log('bridge',obj.bridge)
            console.log('2',user_invite)
            console.log('3',obj.bridge[1])
            console.log('4',interviewee)
            interviewee.forEach((item)=>{
              conns_invite[item].send(JSON.stringify(obj));
            })
          }
          case 'interviewee':
            if(obj.condition !== 'initial'){
            console.log('进入interviewee了！')
            interviewer = user_invite.filter((item)=>{
              return item === obj.bridge[1];
            });
            interviewer.forEach((item)=>{
              conns_invite[item].send(JSON.stringify(obj));
            })
          }
        }
      }
    }
  })
  // conn.on('invite',function (obj) {
  //   obj = JSON.parse(obj);
  //   console.log('11进入invite了！')
  //     if(obj.func === 'invite'){
  //       console.log('22进入invite了！')
  //       conns_invite[''+obj.user+''] = conn;
  //       switch(obj.sender){
  //         case 'interviewer':
  //           //发送给特定面试者
  //           console.log('进入interviewer了！')
  //           interviewee = conns_invite.filter(item=>{
  //             return item === obj.bridge[1]
  //           });
  //           interviewee.forEach(item=>{
  //             conns_invite[item].send(JSON.stringify(obj));
  //           })
  //         case 'interviewee':
  //           console.log('进入interviewee了！')
  //           interviewer = conns_invite.filter(item=>{
  //             return item === obj.bridge[1]
  //           });
  //           interviewer.forEach(item=>{
  //             conns_invite[item].send(JSON.stringify(obj));
  //           })
  //       }
  //   }
  // })
  conn.on("close", function (code, reason) {
    console.log("in router 关闭连接")
  })
  conn.on("error", function (code, reason) {
    console.log("in router 异常关闭")
  });
}).listen(8001)

console.log("WebSocket建立完毕")