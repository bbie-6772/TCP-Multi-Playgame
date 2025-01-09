import { config } from "../../config/config.js";
import { PACKAGE_TYPE } from "../../config/constants/header.js";
import { getProtoMessages } from "../../init/loadProtobuf.js"

export const createResponse = (handlerId, responseCode, data = null) => {
    const protoMessages = getProtoMessages();
    const Response = protoMessages.response.Response

    const responsePayload = {
        handlerId,
        responseCode,
        timestamp: Date.now(),
        sequence: 0,
        data: data ? Buffer.from(JSON.stringify(data)) : null
    }

    const buffer = Response.encode(responsePayload).finish();

    const packetLength = Buffer.alloc(config.packet.totalLength)
    packetLength.writeUInt32BE(buffer.length + config.packet.totalLength + config.packet.typeLength, 0)

    const packetType = Buffer.alloc(config.packet.typeLength)
    packetType.writeUInt8(PACKAGE_TYPE.NORMAL, 0)

    return Buffer.concat([packetLength, packetType, buffer])
}