import { saveLocation } from "../../database/execute/users.js";
import { games } from "../../session.js";
import User from "./user.class.js";

class Users {
    constructor() {
        this.users = new Map();
        // 유저 추가 시 socketId를 이용해 userId 를 찾기 위한 Map 객체
        this.socketToUser = new Map();
    }

    addUser = (deviceId, socket, latency, speed) => {
        const user = new User(deviceId, socket, latency, speed)
        this.users.set(deviceId, user)
        this.socketToUser.set(socket, deviceId)

        return user
    }

    updateSocket = (id, preSocket, newSocket) => {
        this.socketToUser.delete(preSocket)
        this.socketToUser.set(newSocket, id)
    }

    removeUser = async ({ userId, socket }) => {
        if (socket) {
            userId = this.socketToUser.get(socket)
            this.socketToUser.delete(socket)
        }
        // 참여한 게임이 있을 시 확인해서 삭제
        const user = this.users.get(userId)
        // user를 찾을 수 없으면 종료
        if (!user) return
        if (user.gameId) games.games.get(user.gameId).removeUser(userId)
        // 마지막 위치 DB에 저장
        await saveLocation(userId, user.x, user.y)
        this.users.delete(userId)
    }

    getUser = ({ userId, socket }) => {
        if (socket) userId = this.socketToUser.get(socket)
        return this.users.get(userId)
    }
}

export default Users




