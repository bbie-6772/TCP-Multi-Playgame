import initialHandler from "./user/initial.handler.js";
import { HANDLER_IDS } from "../constants/handlerIds.js";
import CustomError from "../utils/error/customError.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";
import createGameHandler from "./game/createGame.handler.js";
import joinGameHandler from "./game/joinGame.handler.js";
import locationUpdateHandler from "./game/updateLocation.handler.js";


const handlers = {
    [HANDLER_IDS.INITIAL]: {
        handler: initialHandler,
        protoType: 'initial.Packet'
    },
    [HANDLER_IDS.CREATE_GAME]: {
        handler: createGameHandler,
        protoType: 'game.CreateGamePayload'
    },
    [HANDLER_IDS.JOIN_GAME]: {
        handler: joinGameHandler,
        protoType: 'game.JoinGamePayload'
    },
    [HANDLER_IDS.LOCATION_UPDATE]: {
        handler: locationUpdateHandler,
        protoType: 'game.LocationUpdatePayload'
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