import { config } from "../../config/config.js"
import { addUser, getUser } from "../../session/user.session.js"
import { createResponse } from "../../utils/response/createResponse.js"

export const initialHandler = async ({socket, payload}) => {
    const { deviceId: userId, latency} = payload
    // 세션에 유저 정보 확인
    const user = getUser({userId})

    // 존재 시 socket 을 바꿔줌
    if(user) user.updateSocket(socket)
    // 없을 시 추가
    else addUser(userId, socket, latency)

    const response = createResponse(config.handler.id.INITIAL, config.handler.responseCode, null)
    socket.write(response)
}