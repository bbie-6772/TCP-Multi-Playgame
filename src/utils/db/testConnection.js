const testDbConnection = async (pool, dbName) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        console.log(`${dbName} 테스트 결과 ${rows[0].solution}`)
    } catch (e) {
        console.error(dbName, "연결 실패",e)
    }
}

const testAllConnections = async (pools) => {
    await testDbConnection(pools.GAME_DB, 'GAME_DB');
    await testDbConnection(pools.USER_DB, 'USER_DB');
}

export { testAllConnections, testDbConnection };