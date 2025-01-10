import User from "../classes/models/user.class.js";
import { users, socketToUser } from "./session.js";

export const addUser = (deviceId, socket, latency) => {
    const user = new User(deviceId, socket, latency)
    users.set(deviceId, user)
    socketToUser.set(socket.id, deviceId)
}

export const removeUser = ({userId, socketId}) => {
    if (socketId) {
        userId = socketToUser.get(socketId)
        socketToUser.delete(socketId)
    }
    users.delete(userId)
}

export const getUser = ({userId, socketId}) => {
    if (socketId) userId = socketToUser.get(socketId)
    return users.get(userId)
}
