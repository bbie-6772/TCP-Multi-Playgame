import { config } from "../config/config.js";
import { PACKAGE_TYPE } from "../config/constants/header.js";
import { handlers } from "../handlers/index.js";
import { getProtoMessages } from "../init/loadProtobuf.js";
import { users } from "../session.js";
import CustomError from "../utils/error/customError.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";
import { errorHandler } from "../utils/error/errorHandler.js";
import { packetParser } from "../utils/parser/packetParser.js";


export const onData = (socket) => async (data) => {
    socket.buffer = Buffer.concat([socket.buffer, data]);

    const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

    while (socket.buffer.length >= totalHeaderLength) {
        const length = socket.buffer.readUInt32BE(0);
        const packetType = socket.buffer.readUInt8(config.packet.totalLength)
        if (socket.buffer.length < length) break 

        const packet = socket.buffer.slice(totalHeaderLength, length);
        socket.buffer = socket.buffer.slice(length);

        try {
            switch (packetType) {
                case PACKAGE_TYPE.PING: {
                    const protoMessage = getProtoMessages();
                    const Ping = protoMessage.common.Ping
                    const timestamp = Ping.decode(packet)

                    const user = users.getUser({socket})
                    if (!user) throw new CustomError(ErrorCodes.USER_NOT_FOUND, "핑 관리에서 유저 못찾음");

                    user.pong(timestamp)
                    break;
                }
                case PACKAGE_TYPE.NORMAL: {
                    const { handlerId, userId, payload } = packetParser(packet)

                    const handler = handlers[handlerId].handler

                    await handler({socket, userId, payload })
                    break;
                }
                default: {
                    throw new CustomError(ErrorCodes.UNKNOWN_PACKET_TYPE,"패킷 아이디 잘못됨")
                }
            }

        } catch (e) {
            errorHandler(socket, e)
        }
            
    }
}