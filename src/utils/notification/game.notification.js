import { config } from "../../config/config.js";
import { PACKET_TYPE } from "../../constants/header.js";
import { getProtoMessages } from "../../init/loadProtos.js";

const makeNotification = (message, type) => {
    // 헤더 생성(totalLength = 헤더 총 길이)
    const packetLength = Buffer.alloc(config.packet.totalLength);
    packetLength.writeUInt32BE(message.length + config.packet.totalLength + config.packet.typeLength, 0);

    const packetType = Buffer.alloc(config.packet.typeLength);
    packetType.writeUInt8(type, 0);

    return Buffer.concat([packetLength, packetType, message]);
}


export const createPingPacket = (timestamp) => {
    const protoMessages = getProtoMessages();
    const ping = protoMessages.common.Ping

    const payload = {timestamp}
    const message = ping.create(payload);

    const pingPacket = ping.encode(message).finish();

    return makeNotification(pingPacket, PACKET_TYPE.PING);
}


export const createLocationNotification = (users) => {
    const protoMessages = getProtoMessages();
    const LocationUpdate = protoMessages.gameNotification.LocationUpdate;

    const payload = { users }
    const message = LocationUpdate.create(payload);
    const locationPacket = LocationUpdate.encode(message).finish();

    return makeNotification(locationPacket, PACKET_TYPE.LOCATION);
}

export const gameStartNotification = (gameId, timestamp) => {
    const protoMessages = getProtoMessages();
    const GameStart = protoMessages.gameNotification.Start;

    const payload = { gameId, timestamp }
    const message = GameStart.create(payload);
    const gameStartPacket = GameStart.encode(message).finish();

    return makeNotification(gameStartPacket, PACKET_TYPE.GAME_START);
}