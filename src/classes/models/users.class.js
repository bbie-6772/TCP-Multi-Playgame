import User from "./user.class.js";

class Users {
    constructor() {
        this.users = new Map();
        this.socketToUser = new Map();
    }

    addUser = (deviceId, socket, latency) => {
        const user = new User(deviceId, socket, latency)
        users.set(deviceId, user)
        socketToUser.set(socket.id, deviceId)
    }

    removeUser = ({ userId, socketId }) => {
        if (socketId) {
            userId = socketToUser.get(socketId)
            socketToUser.delete(socketId)
        }
        users.delete(userId)
    }

    getUser = ({ userId, socketId }) => {
        if (socketId) userId = socketToUser.get(socketId)
        return users.get(userId)
    }

}

export default Users




