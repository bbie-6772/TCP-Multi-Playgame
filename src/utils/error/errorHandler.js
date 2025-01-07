import { createResponse } from "../response/createResponse.js";
import { ErrorCodes } from "./errorCodes.js";

export const handlerError = (error, socket) => {
    console.error(error);

    let responseCode;
    let message;

    if (error.code) {
        responseCode = error.code;
        message = error.message;
        console.log(`responseCode: ${responseCode}, message: ${message}`);
    } else {
        responseCode = ErrorCodes.SOCKET_ERROR;
        message = error.message;
        console.log(`new Error - message: ${message}`);
    }

    const errorResponse = createResponse(-1, responseCode, {message}, null);
    socket.write(errorResponse);
}