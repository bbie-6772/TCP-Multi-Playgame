import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pools from '../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const executeFile = async (pool, filePath) => {
    const sql = fs.readFileSync(filePath);
    const queries = sql.split(";")
    .map((query) => query.trim())
    .filter((q) => q.length > 0);

    for (const query of queries) await pool.query(query)
}

const createSchemas = async () => {
    const filePath = path.join(__dirname, 'database.sql')
    try {
        await executeFile(pools.USER_DB, filePath);
    } catch(e) {
        console.error("DB 생성 오류",e)
    }
}

createSchemas().then(()=> {
    console.log("DB 생성완료");
    process.exit(0);
}).catch((e) => {
    console.error(e);
    process.exit(1);
})