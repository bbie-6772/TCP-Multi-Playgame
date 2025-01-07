import { getGameSessionById } from "../../session/game.session.js";
import CustomError from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { createLocationNotification } from "../../utils/notification/game.notification.js";

const locationUpdateHandler = ({socket, userId, payload}) => {
    try {
        const { gameId, x, y } = payload;
        const gameSession = getGameSessionById(gameId);
        if (!gameSession) throw new CustomError(ErrorCodes.GAME_NOT_FOUND, 'Game not found');

        const user = gameSession.getUser(userId);
        if (!user) throw new CustomError(ErrorCodes.USER_NOT_FOUND, 'User not found');

        user.updatePosition(x, y);
        const packet = gameSession.getAllLocation() ;

        socket.write(packet);
    } catch (e) {
        handlerError(e, socket);
    }
}

export default locationUpdateHandler;
