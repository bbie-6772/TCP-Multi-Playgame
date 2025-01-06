import { config } from "../../config/config.js";
import { getProtoTypeNameByHandlerId } from "../../handlers/index.js";
import { getProtoMessages } from "../../init/loadProtos.js"
import CustomError from "../error/customError.js";
import { ErrorCodes } from "../error/errorCodes.js";

export const packetParser = (data) => {
    const protoMessages = getProtoMessages();

    // 공통 패킷 구조 디코딩
    const Packet = protoMessages.common.Packet;
    let packet;
    try {
        packet = Packet.decode(data);
    } catch (err) {
        throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, 'Packet decode error');
    }

    const handlerId = packet.handlerId;
    const userId = packet.userId;
    const clientVersion = packet.clientVersion;
    const sequence = packet.sequence;

    // 클라이언트 버전 확인
    if (clientVersion !== config.client.version) throw new CustomError(ErrorCodes.CLIENT_VERSION_MISMATCH, 'Client version mismatch');

    // 핸들러 확인
    const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
    if (!protoTypeName) throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, 'Unknown handler id');

    const [namespace, typeName] = protoTypeName.split('.');
    const PayloadType = protoMessages[namespace][typeName];
    let payload 
    try{
        PayloadType.decode(packet.payload);
    } catch (err) {
        throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, 'Packet decode error');
    }   

    // 필수 필드가 비어있는 경우(누락) 확인
    const expectedFields = Object.keys(PayloadType.fields);
    const actualFields = Object.keys(payload);
    const missingFields = expectedFields.filter(field => !actualFields.some(field));
    if (missingFields.length > 0) throw new CustomError(ErrorCodes.MISSING_FIELDS, 'Missing fields');

    return { handlerId, userId, payload, sequence };
}