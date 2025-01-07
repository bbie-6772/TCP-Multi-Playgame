export const SQL_QUERIES = {
    FIND_USER_BY_ID: 'SELECT * FROM users WHERE device_id = ?',
    CREATE_USER: 'INSERT INTO users (id, device_id) VALUES (?, ?)',
    UPDATE_USER_LOGIN: 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
}