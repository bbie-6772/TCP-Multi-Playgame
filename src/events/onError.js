import { removeUser } from "../session/user.session.js";
import CustomError from "../utils/error/customError.js";
import { handlerError } from "../utils/error/errorHandler.js"

export const onError = (socket) => (err) => {
    
    handlerError(new CustomError(500, `Socket Error : ${err}`), socket);
    
    // 세션에서 유저 삭제
    removeUser(socket);
}