import { PORT, HOST, CLIENT_VERSION , DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, DB_NAME } from "./constants/env.js"
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "./constants/handler.js"
import { PACKAGE_TYPE_LENGTH, TOTAL_LENGTH } from "./constants/header.js"

export const config = {
    server: {
        port: PORT,
        host: HOST
    },
    client: {
        version: CLIENT_VERSION
    },
    database: {
        USER_DB: {
            name: DB_NAME,
            user: DB_USER,
            password: DB_PASSWORD,
            host: DB_HOST,
            port: DB_PORT
        }
    },
    packet: {
        totalLength: TOTAL_LENGTH,
        typeLength: PACKAGE_TYPE_LENGTH,
    },
    handler: {
        id: HANDLER_IDS,
        responseCode: RESPONSE_SUCCESS_CODE
    },
    
}