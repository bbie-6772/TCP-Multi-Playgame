import { config } from "../../config/config.js";
import { getProtoTypeById } from "../../handlers/index.js";
import { getProtoMessages } from "../../init/loadProtobuf.js"
import CustomError from "../error/customError.js";
import { ErrorCodes } from "../error/errorCodes.js";

export const packetParser = (data) => {
    const protoMessages = getProtoMessages();
    const Packet = protoMessages.common.Packet;
    let Payload;
    let packet;
    try {
        packet = Packet.decode(data);
        const [namespace, typeName] = getProtoTypeById(packet.handlerId).split('.')
        Payload = protoMessages[namespace][typeName]

        packet.payload = Payload.decode(packet.payload)
    } catch (e) {
        throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR,"Packet Decode Error")
    }

    const clientVersion = packet.version;
    if (config.client.version !== clientVersion) 
        throw new CustomError(ErrorCodes.CLIENT_VERSION_MISMATCH,"Client Version Mismatch")

    const expectedFields = Object.keys(Payload.fields)
    const actualFields = Object.keys(packet.payload)
    const missingFields = expectedFields.filter(field => !actualFields.includes(field));
    if (missingFields.length > 0) throw new CustomError(ErrorCodes.MISSING_FIELDS, "Missing Fields")

    return { ...packet };
}