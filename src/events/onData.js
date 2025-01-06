import { config } from "../config/config.js";
import { PACKET_TYPE } from "../constants/header.js";
import { getHandlerById } from "../handlers/index.js";
import { getUserById } from "../session/user.session.js";
import CustomError from "../utils/error/customError.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";
import { handlerError } from "../utils/error/errorHandler.js";
import { packetParser } from "../utils/parser/packetParser.js";

export const onData = (socket) => async (data) => {

    // buffer 업데이트
    socket.buffer = Buffer.concat([socket.buffer, data]);

    const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

    while (socket.buffer.length >= totalHeaderLength) {
        // 전체 패킷 길이와 패킷 타입을 읽음
        const length = socket.buffer.readUInt32BE(0);
        const packetType = socket.buffer.readUInt8(config.packet.totalLength);
        // 전체 패킷 도착 대기
        if (socket.buffer.length < length) break
        // 패킷 추출
        const packet = socket.buffer.subarray(totalHeaderLength, length);
        // 다음 패킷의 경우 버퍼에 남겨둠
        socket.buffer = socket.buffer.subarray(length);

        try {
            switch (packetType) {
                case PACKET_TYPE.PING:
                    break;
                case PACKET_TYPE.NORMAL:
                    const { handlerId, userId, payload, sequence } = packetParser(packet);

                    const user = getUserById(userId);
                    if (user && user.sequence !== sequence) throw new CustomError(ErrorCodes.INVALID_SEQUENCE, 'Invalid sequence');

                    const handler = getHandlerById(handlerId);

                    await handler({ socket, userId, payload, sequence });

                    break;
                default:
                    console.log('알 수 없는 패킷');
                    break;
            }
        } catch (err) {
            handlerError(socket, err);
        }


        console.log(`수신 ${packet.toString()}`);
    }
}