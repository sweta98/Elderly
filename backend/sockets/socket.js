const socketio = require('socket.io')
var sockets = {}    // socketId : socket object

function newSocket(user, channel){
    return {
        client    : user,     // user object
        channelId : channel   // channel id (0: public, 1~: private)
    }
}

// Create and return a new socket object 
function addSocket(sid, user, channel){
    let socket = newSocket(user, channel)
    sockets[sid] = socket
    return socket
}

// retrieve socket by id
function getSocket(sid){
    return sockets[sid]
}

// close socket by id, and return it
function removeSocket(sid){
    let socket = getSocket(sid)
    delete sockets[sid]
    //console.log(sockets)
    return socket
}



function onConnect(socket) {
    socket.on('joinChat', ({user, channel}) => {
        addSocket(socket.id, user, channel)
        socket.join(channel)
        socket.broadcast
            .to(channel)
            .emit('toConsole', {msg:`${user.username} has joined the chat`})
        // ESN directory
        socket.emit('esnUpdate', sockets)
        socket.broadcast.emit('esnUpdate', sockets)
        socket.emit('updateNotify')
    })

}


function setUpSocket(server){
    const io = socketio(server)
    io.on('connect', onConnect)
}


module.exports = {setUpSocket}