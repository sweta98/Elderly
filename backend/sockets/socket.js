var socket = require('socket.io');

class socket_instance{
    constructor() { this.io = undefined; }

    createInstance(server) {
        return socket(server);
    }

    getInstance(server) {
        if (this.io == undefined) {
            this.io = this.createInstance(server);
        }
        return this.io;
    }
}

module.exports = socket_instance;