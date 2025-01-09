import initialHandler from "./user/initial.handler.js";
import { HANDLER_IDS } from "../constants/handlerIds.js";
import CustomError from "../utils/error/customError.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";
import createGameHandler from "./game/createGame.handler.js";
import joinGameHandler from "./game/joinGame.handler.js";
import locationUpdateHandler from "./game/updateLocation.handler.js";


const handlers = {
    /* 
    [핸들러 아이디] : {
        handler: 핸들러 함수,
        protoType: 핸들러에 들어갈 payload 의 protobuf 구조
    }
    */
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

// 핸들러 함수 찾기
export const getHandlerById = (handlerId) => {
    if (!handlers[handlerId]) throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, 'Unknown handler id');
    else return handlers[handlerId].handler;
};

// 핸들러 함수에 들어갈 Payload의 구조 찾기
export const getProtoTypeNameByHandlerId = (handlerId) => {
    if (!handlers[handlerId]) throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, 'Unknown Prototype');
    else return handlers[handlerId].protoType;
};