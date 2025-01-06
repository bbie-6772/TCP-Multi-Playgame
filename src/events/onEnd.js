import { removeUser } from "../session/user.session.js";

export const onEnd = (socket) => () => {
    console.log(`끊김 ${socket.remoteAddress} : ${socket.remotePort}`);

    // 세션에서 유저 삭제
    removeUser(socket);
}