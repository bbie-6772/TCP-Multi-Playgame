import { games } from "../../session.js";
import User from "./user.class.js";

class Users {
    constructor() {
        this.users = new Map();
        // 유저 추가 시 socketId를 이용해 userId 를 찾기 위한 Map 객체
        this.socketToUser = new Map();
    }

    addUser = (deviceId, socket, latency) => {
        const user = new User(deviceId, socket, latency)
        this.users.set(deviceId, user)
        this.socketToUser.set(socket, deviceId)
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

    getUser = ({ userId, socket }) => {
        if (socket) userId = this.socketToUser.get(socket)
        return this.users.get(userId)
    }
}

export default Users




