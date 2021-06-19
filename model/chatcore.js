var chatcore = {};

chatcore.init = function(io){
    io.on('connection',function(socket){
        console.log('已连接')
        socket.on('joinRoom',function(data){
            console.log('已加入聊天')
            // socket.
            // socket.email = data.email
            // socket.username = data.username
            socket.on('sendMessage', (data) => {
                data.id = socket.id;
                io.emit('receiveMessage', data);
            })
        })
    })
}

module.export = chatcore