import { config } from "../../config/config.js"
import { packetNames } from "../../protobuf/packetNames.js"
import { users } from "../../session.js"
import { createResponse } from "../../utils/response/createResponse.js"
import { joinGameHandler } from "../game/game.handler.js"

export const initialHandler = async ({socket, payload}) => {
    const { deviceId: userId, latency} = payload
    // 세션에 유저 정보 확인
    const user = users.getUser({userId})

    // 존재 시 socket 을 바꿔줌
    if(user) user.updateSocket(socket)
    // 없을 시 추가
    else users.addUser(userId, socket, latency)

    const response = createResponse({
        handlerId: config.handler.id.INITIAL, 
        responseCode: config.handler.responseCode, 
        data: {
            userId,
            x: 0,
            y: 0
        }, 
        protoType: packetNames.initialResponse.Packet,
        userId
        }
    )

    socket.write(response)

    // 서버에 게임이 1개이므로 바로 참여
    joinGameHandler({ socket, userId, payload })
}