export const USERS_QUERIES = {
    CREATE_USER: 'INSERT INTO users (device_id) VALUES (?)',
    FIND_USER: 'SELECT device_id, location_x, location_y FROM users WHERE device_id = ?',
    SAVE_LOCATION: 'UPDATE users SET location_x = ?, location_y = ? WHERE device_id = ?',
    UPDATE_USER_LOGIN: 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE device_id = ?',
}