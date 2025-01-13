import { gameId } from "../../init/index.js"
import { games, users } from "../../session.js"
import CustomError from "../../utils/error/customError.js"
import { ErrorCodes } from "../../utils/error/errorCodes.js"
// import { createResponse } from "../../utils/response/createResponse.js"

export const joinGameHandler = ({ socket, userId, payload }) => {
    // 이 부분은 서버에서 게임이 1개 뿐이므로 다른 방식으로 구현
    // const { gameId } = payload
    const game = games.games.get(gameId);

    const user = users.getUser({userId});
    if(!user) throw new CustomError(ErrorCodes.USER_NOT_FOUND,"User Not Found");

    game.addUser(user)

    // 방 부분이 추가되면 해야되는 작업
    // const response = createResponse({})
    // socket.write()
}

export const startGame = () => {

}