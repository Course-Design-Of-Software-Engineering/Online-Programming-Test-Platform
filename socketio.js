var socketio = {}
var socket_io = require('socket.io')
var chatcore = require('./model/chatcore')

socketio.getSocketio = function(server){
    var io = socket_io.listen(server);
    chatcore.init(io);
}

module.exports = socketio