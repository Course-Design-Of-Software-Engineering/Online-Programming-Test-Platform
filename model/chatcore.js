var chatcore = {};

var participants ={}

chatcore.init = function(io){
    io.on('connection', (socket) => {
        console.log("连接成功了!!!!!!")
        socket.on('sendMsg', (data) => {
            data.id = socket.id;
            io.emit('receiveMsg', data);
        })
    })

    //下面的需要在前端定义interviewId等等才能测试..
    // io.on('connection', function(socket){
    //     console.log('已连接')
    //     socket.on('joinRoom',function(data){
    //         console.log('已加入聊天')
    //         //面试用_id?link?
    //         let interviewId = data.interviewId
    //         socket.email = data.email
    //         socket.username = data.username
    //         //参与人数 ?
    //         if(!participants[interviewId]){
    //             participants[interviewId] = []
    //         }
    //         participants[interviewId].push(socket.email)
    //         //console.log(participants[interviewId])
            
    //         //加入该面试对应房间
    //         socket.join(interviewId)
    //         //in在指定房间中,为所有房间的socket发送消息=广播
    //         //有人加入房间,对所有参与者更新参与者名单
    //         io.socket.in(interviewId).emit('joinRoom',data)
    //         io.socket.in(interviewId).emit('updateP',participants[interviewId])
    //     })
    //     socket.on('leaveRoom',function(data){
    //         console.log('已退出聊天')
    //         let interviewId = data.interviewId
    //         socket.email = data.email
    //         socket.username = data.username
    //         //移除退出的人
    //         let index = participants[interviewId].indexOf(socket.email) 
    //         if(index !== -1){
    //             participants[interviewId].splice(index,1)
    //         }
    //         //console.log(participants[interviewId])

    //         //离开房间
    //         socket.leave(participants)
    //         //in在指定房间中,为所有房间的socket发送消息=广播
    //         io.socket.in(participants).emit('leaveRoom',data)
    //         io.socket.in(participants).emit('updateP',participants[interviewId])
    //     })
        
    //     // socket.on('disconnect',function(){
    //     //     console.log('已下线')
    //     // })

    //     //收发消息
    //     socket.on('sendMsg',function(data){
    //         console.log(data)
    //         socket.in(interviewId).emit('receiveMsg',data)
    //     })
    // })
    
}

module.exports = chatcore