import { onData } from "./onData.js"
import { onEnd } from "./onEnd.js"
import { onError } from "./onError.js"

export const onConnection = (socket) => {
    console.log("유저 연결")

    socket.buffer = Buffer.alloc(0);

    socket.on('data', onData(socket))
    socket.on('end', onEnd(socket))
    socket.on('error', onError(socket))
}
