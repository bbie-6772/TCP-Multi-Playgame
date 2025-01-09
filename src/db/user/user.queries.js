export const SQL_QUERIES = {
    // connection.query(sql, [params]) 형식으로 사용할 때 ? 부분이 params가 들어감
    // 유저 찾기 쿼리
    FIND_USER_BY_ID: 'SELECT * FROM users WHERE device_id = ?',
    // 유저 추가 쿼리
    CREATE_USER: 'INSERT INTO users (id, device_id) VALUES (?, ?)',
    // 유저 로그인 업데이트 쿼리
    UPDATE_USER_LOGIN: 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
}