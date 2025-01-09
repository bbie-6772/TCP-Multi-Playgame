import { PORT, HOST, CLIENT_VERSION, DB1_NAME, DB2_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./constants/env.js"
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
        GAME_DB: {
            name: DB1_NAME,
            user: DB_USER,
            password: DB_PASSWORD,
            host: DB_HOST,
            port: DB_PORT
        },
        USER_DB: {
            name: DB2_NAME,
            user: DB_USER,
            password: DB_PASSWORD,
            host: DB_HOST,
            port: DB_PORT
        },
    },
    packet: {
        totalLength: TOTAL_LENGTH,
        typeLength: PACKAGE_TYPE_LENGTH,
    }
}