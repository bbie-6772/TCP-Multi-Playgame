const testDbConnection = async (pool, dbName) => {
    try {
        // DB가 연결되어 1 + 1 이라는 연산이 가능한지 테스트
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        console.log(`${dbName} 테스트 결과 ${rows[0].solution}`)
    } catch (e) {
        // 만약 연결이 실패한다면 에러가 발동되기에 try catch 사용
        console.error(dbName, "연결 실패",e)
    }
}

// 각 DB들을 모두 순회하는 함수
const testAllConnections = async (pools) => {
    await testDbConnection(pools.GAME_DB, 'GAME_DB');
    await testDbConnection(pools.USER_DB, 'USER_DB');
}

export { testAllConnections, testDbConnection };