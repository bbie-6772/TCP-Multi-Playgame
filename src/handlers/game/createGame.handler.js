import { addGameSession } from "../../session/game.session.js";
import { getUserById } from "../../session/user.session.js";
import CustomError from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { v4 as uuidv4 } from 'uuid';
import { createResponse } from "../../utils/response/createResponse.js";
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";

const createGameHandler = async ({socket, userId, payload}) => {
    try{
        const gameId = uuidv4();
        const gameSession = addGameSession(gameId);

        const user = getUserById(userId);
        if(!user) throw new CustomError(ErrorCodes.USER_NOT_FOUND, "User not found");

        gameSession.addUser(user);

        const createGameResponse = createResponse(
            HANDLER_IDS.CREATE_GAME,
            RESPONSE_SUCCESS_CODE,
            { gameId, message: "Game created successfully" },
            userId
        )
        
        socket.write(createGameResponse)
    } catch(e) {
        handlerError (e, socket);
    }
}

export default createGameHandler;