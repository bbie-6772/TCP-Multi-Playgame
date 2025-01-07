import { config } from "../config/config.js";
import { formatDate } from "../utils/dateFormatter.js";
import mysql from 'mysql2/promise'

const { databases } = config;

const createPool = (dbConfig) => {
    const pool = mysql.createPool({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.name,
        waitForConnections: true,
        // 커넥션 풀에서 최대 연결 수
        connectionLimit: 10, 
        // 0일 경우 대기열 수가 무제한 (<= 최대 연결이 꽉찻을 때의 대기열)
        queueLimit: 0, 
    })   

    const originQuery = pool.query;

    pool.query = (sql, params) => {
        const date = new Date();

        console.log(`${formatDate(date)} / ${sql} / ${params && JSON.stringify(params)}`)

        return originQuery.call(pool, sql, params);
    }

    return pool;
}

const pools = {
    GAME_DB: createPool(databases.GAME_DB),
    USER_DB: createPool(databases.USER_DB),
}

export default pools;