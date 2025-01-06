import initialHandler from "./user/initial.handler.js";
import { HANDLER_IDS } from "../constants/handlerIds.js";
import CustomError from "../utils/error/customError.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";


const handlers = {
    [HANDLER_IDS.INITIAL]: {
        handler: initialHandler,
        protoType: 'initial.Packet'
    }
};

export const getHandlerById = (handlerId) => {
    if (!handlers[handlerId]) throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, 'Unknown handler id');
    else return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
    if (!handlers[handlerId]) throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, 'Unknown Prototype');
    else return handlers[handlerId].protoType;
};