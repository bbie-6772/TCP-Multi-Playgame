import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 6325
export const HOST = process.env.HOST || localhost
export const CLIENT_VERSION = process.env.CLIENT_VERSION || '1.0.0'

export const DB_USER = process.env.DB_USER || "user"
export const DB_PASSWORD = process.env.DB_PASSWORD || "password"
export const DB_HOST = process.env.DB_HOST || "localhost"
export const DB_PORT = process.env.DB_PORT || "3306"

export const DB1_NAME = process.env.DB1_NAME || "database1"
export const DB2_NAME = process.env.DB1_NAME || "database2"