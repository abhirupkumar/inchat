//Node server which will handle socket io connection
const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});

const users = {};
io.on('connection', socket => {

    socket.emit('message', 'Welcome to InChat');
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //sends the message to other users, other than new joiny
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id])
        delete users[socket.id];
    })
})