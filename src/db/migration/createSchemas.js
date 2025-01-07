import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pools from '../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const executeSqlFile = async (pools, filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    const queries = sql.split(';')
    .map((query) => query.trim())
    .filter(query => query.length > 0);

    for (const query of queries) {
        await pools.query(query);
    }
}

const createSchemas = async () => {
    const sqlDir = path.join(__dirname, '../sql');
    try {
        await executeSqlFile(pools.USER_DB, path.join(sqlDir, 'user_db.sql'))
    } catch(e) {
        console.error("데이터 베이스 생성 오류",e)
    }
}

createSchemas().then(() => {
    console.log("데이터 베이스 생성 완료")
    process.exit(0);
}).catch((err) => {
    console.error(err);
    // 강제종료
    process.exit(1);
})