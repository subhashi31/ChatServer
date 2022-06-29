// node server
// handles socket.io connection

const io = require('socket.io')(8000, {
    cors:{origin:'*',}
});

const users = {};

// jesse hi connection establish hoga it starts listening to each instance
io.on('connection', socket => {

    // user joins chat event
    socket.on('new-user-joined', name => {
        users[socket.id] = name;

        // if someone joins everyone gets to know
        socket.broadcast.emit('user-joined', name);
    });

    // user sends message event
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    // user left event
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});