import { config } from "../../config/config.js";
import { PACKAGE_TYPE } from "../../config/constants/header.js";
import { getProtoMessages } from "../../init/loadProtobuf.js"
import { getUser } from "../../session/user.session.js";
import CustomError from "../error/customError.js";
import { ErrorCodes } from "../error/errorCodes.js";

export const createResponse = ({handlerId, responseCode, data = null, protoType = null, userId}) => {
    const protoMessages = getProtoMessages();
    const Response = protoMessages.response.Packet
    const user = getUser({userId})

    try{
        if(data) {
            const [namespace, typeName] = protoType.split('.');
            const Payload = protoMessages[namespace][typeName];
            data = Payload.encode(data).finish();
        }
    } catch(e) {
        throw new CustomError(ErrorCodes.PACKET_STRUCTURE_MISMATCH,e)
    }

    const responsePayload = {
        handlerId,
        responseCode,
        timestamp: Date.now(),
        sequence: user ? user.getNextSequence() : 0,
        data: data
    }

    const buffer = Response.encode(responsePayload).finish();

    const packetLength = Buffer.alloc(config.packet.totalLength)
    packetLength.writeUInt32BE(buffer.length + config.packet.totalLength + config.packet.typeLength, 0)

    const packetType = Buffer.alloc(config.packet.typeLength)
    packetType.writeUInt8(PACKAGE_TYPE.NORMAL, 0)

    return Buffer.concat([packetLength, packetType, buffer])
}