import { config } from "../../config/config.js"
import { createUser, findUser, updateLogin } from "../../database/execute/users.js"
import { packetNames } from "../../protobuf/packetNames.js"
import { users } from "../../session.js"
import { createResponse } from "../../utils/response/createResponse.js"
import { joinGameHandler } from "../game/game.handler.js"

export const initialHandler = async ({socket, payload}) => {
    const { deviceId: userId, latency} = payload
    // 세션에 유저 정보 확인
    let user = users.getUser({userId})

    // 존재 시 socket 을 바꿔줌
    if(user) {
        user.updateSocket(socket);
        await updateLogin(userId);
    // 없을 시 DB 동기화 후 추가
    } else {
        const dbUser = await findUser(userId);
        user = users.addUser(userId, socket, latency)
        if (dbUser) {
            user.updatePosition(dbUser.location_x, dbUser.location_y)
            await updateLogin(userId);
        } else await createUser(userId)
    }

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