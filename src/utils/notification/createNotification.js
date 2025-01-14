import { config } from "../../config/config.js";
import { PACKAGE_TYPE } from "../../config/constants/header.js";
import { getProtoMessages } from "../../init/loadProtobuf.js";

const addHeader = (payload, type) => {
    const packetLength = Buffer.alloc(config.packet.totalLength)
    packetLength.writeUInt32BE(payload.length + config.packet.totalLength + config.packet.typeLength, 0)

    const packetType = Buffer.alloc(config.packet.typeLength)
    packetType.writeUInt8(type, 0)

    return Buffer.concat([packetLength, packetType, payload])
}

export const createPing = () => {    
    const protoMessages = getProtoMessages()
    const Ping = protoMessages.common.Ping

    const now = { timestamp: Date.now() };
    const buffer = Ping.encode(now).finish();

    return addHeader(buffer, PACKAGE_TYPE.PING)
}

export const createLocation = (payload) => {
    const protoMessages = getProtoMessages()
    const LocationUpdate = protoMessages.gameNotification.LocationUpdate

    const buffer = LocationUpdate.encode(payload).finish();

    return addHeader(buffer, PACKAGE_TYPE.LOCATION);
}