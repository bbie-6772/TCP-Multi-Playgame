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

    removeUser = ({ userId, socket }) => {
        if (socket) {
            userId = this.socketToUser.get(socket)
            this.socketToUser.delete(socket)
        }
        // 참여한 게임이 있을 시 확인해서 삭제
        const user = this.users.get(userId)
        if (user.gameId) games.games.get(user.gameId).removeUser(userId)

        this.users.delete(userId)
    }

}

export default Users




