import User from "../classes/models/user.class.js";
import { userSessions } from "./sessions.js";

export const addUser = (socket, uuid) => {
    const user = new User(uuid, socket);
    userSessions.push(user);
    return user
};

export const removeUser = (socket) => {
    const index = userSessions.findIndex(user => user.socket === socket);
    if (index !== -1) return userSessions.splice(index, 1);
};

export const getUserById = (id) => {
    return userSessions.find(user => user.id === id);
};

export const getNextSequence = (id) => {
    const user = getUserById(id);
    if (user) return user.getNextSequence();
    else return null;
}

export const getUserBySocket = (socket) => {
    return userSessions.find(user => user.socket === socket);
}