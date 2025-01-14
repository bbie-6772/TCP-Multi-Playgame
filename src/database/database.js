import { config } from "../config/config.js";
import mysql from 'mysql2/promise'

const { database } = config;

const createPool = (dbConfig) => {
    const pool = mysql.createPool({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.name,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    return pool;
}   

const pools= {
    USER_DB: createPool(database.USER_DB)
}

export default pools;