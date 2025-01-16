import { config } from "../config/config.js";
import { packetNames } from "../protobuf/packetNames.js";
import CustomError from "../utils/error/customError.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";
import { locationUpdate, directionUpdate } from "./game/game.handler.js";
import { initialHandler } from "./user/initial.handler.js";

export const handlers = {
    [config.handler.id.INITIAL]: {
        handler: initialHandler,
        protoType: packetNames.initialRequest.Packet
    },
    [config.handler.id.LOCATION_UPDATE]: {
        handler: locationUpdate,
        protoType: packetNames.gamePayload.LocationUpdate
    },
    [config.handler.id.DIRECT_UPDATE]: {
        handler: directionUpdate,
        protoType: packetNames.gamePayload.DirectionUpdate
    }
}

export const getHandlerById = (handlerId) => {
    if (!handlers[handlerId]) throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID,"Unknown Handler Id")
    else return handlers[handlerId].handler
}

export const getProtoTypeById = (handlerId) => {
    if (!handlers[handlerId]) throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, "Unknown Handler Id")
    else return handlers[handlerId].protoType
}