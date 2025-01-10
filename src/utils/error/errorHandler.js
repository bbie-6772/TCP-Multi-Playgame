import { packetNames } from "../../protobuf/packetNames.js";
import { createResponse } from "../response/createResponse.js";
import { ErrorCodes } from "./errorCodes.js";

export const errorHandler = (socket, error) => {
    
    let responseCode;
    let message;

    if (error.name === "CustomError") {
        responseCode = error.code;
        message = error.message;
        console.error(`예상된 오류 ${responseCode} / ${message}`)
    } else {
        responseCode = ErrorCodes.SOCKET_ERROR;
        message = error.message;
        console.error("예상치 못한 오류", message)
    }

    const errorResponse = createResponse({
        handlerId: -1, 
        responseCode, 
        data: {message},
        protoType: packetNames.error.Error
    })
    socket.write(errorResponse)
}