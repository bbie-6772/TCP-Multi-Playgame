import { TOTAL_LENGTH, PACKET_TYPE_LENGTH } from "../constants/header.js";

export const readHeader = (buffer) => {
    return {
        length: buffer.readUInt32BE(0),
        packetType: buffer.writeUInt8(TOTAL_LENGTH),
    };
};

export const writeHeader = (length, packetType) => {
    const headerSize = TOTAL_LENGTH + PACKET_TYPE_LENGTH;
    const buffer = Buffer.alloc(headerSize);
    buffer.writeUInt32BE(length + headerSize, 0);
    buffer.writeUInt8(packetType, TOTAL_LENGTH);
    return buffer;
};