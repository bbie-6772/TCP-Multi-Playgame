import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { getGameSessionById } from "../../session/game.session.js";
import { getUserById } from "../../session/user.session.js";
import CustomError from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { createResponse } from "../../utils/response/createResponse.js";


const joinGameHandler = async ({socket, userId, payload}) => {
    try {
        const { gameId } = payload;

        const gameSession = getGameSessionById(gameId);
        if(!gameSession) throw new CustomError(ErrorCodes.GAME_NOT_FOUND, "Game not found");

        const user = getUserById(userId);
        if(!user) throw new CustomError(ErrorCodes.USER_NOT_FOUND, "User not found");

        // 중복 요청 확인
        const existingUser = gameSession.getUser(user.id);
        if(!existingUser) gameSession.addUser(user);

        const joinGameResponse = createResponse(
            HANDLER_IDS.JOIN_GAME,
            RESPONSE_SUCCESS_CODE,
            { gameId, message: "Game joined successfully" },
            user.id
        )

        socket.write(joinGameResponse)
    } catch (e) {
        handlerError(e, socket);
    }

}

export default joinGameHandler;