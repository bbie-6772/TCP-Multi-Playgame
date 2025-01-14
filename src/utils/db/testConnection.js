const testDBConnection = async (pool, dbName) => {
    try{
        const [rows] = await pool.query('SELECT 1 + 1 AS solution')
        console.log(`${dbName} 연결 확인결과 ${rows[0].solution}`)
    }catch(e) {
        console.error(dbName,"연결 실패")
    }
}

export const testAllConnections = async (pools) => {
    Object.entries(pools).forEach(async ([name, pool]) => {
        await testDBConnection(pool, name)
    })
}