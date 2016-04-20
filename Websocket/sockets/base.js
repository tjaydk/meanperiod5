var cookieParser = require('cookie-parser');

//io.emit is sending to everyone
//io.broadcast.emit sends to everyone else thatn the socket

module.exports = function(io) {


    var userList = new Map();
    var users = [];


    io.on('connection', function(socket) {
        var username = "anonymous " + Math.floor(Math.random() * (10000));
        socket.username = username;
        users.push(socket.username);

        io.emit('init', {username: socket.username, msg: "Hello from server", users: users, ioID: socket.request.headers.cookie});

        socket.on('sendMsg', function(msg){
            io.emit("msg", {msg: msg.msg, username: socket.username});
        });

        socket.on('changeUsername', function(data){
            var index = users.indexOf(socket.username);
            users.splice(index, index+1);
            socket.username = data.username;
            users.push(socket.username);

            io.emit('userlist', users);
        });

        socket.on('disconnect', function(){
            var index = users.indexOf(socket.username);
            users.splice(index, index+1);
            io.emit('userlist', users);
        });


    });


};