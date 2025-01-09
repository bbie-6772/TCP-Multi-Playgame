import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pools from '../database.js';

//현재 파일의 절대경로 찾기
const __filename = fileURLToPath(import.meta.url);
//디렉토리 경로(현재 파일위치) 추출
const __dirname = path.dirname(__filename);

// sql file 을 읽어 변환 해주는 함수
const executeSqlFile = async (pools, filePath) => {
    // 받아온 인자 filePath 에 있는 파일 읽기
    const sql = fs.readFileSync(filePath, 'utf8');
    // 파일에서 split(';')을 통해 쿼리문을 분리
    const queries = sql.split(';')
    // 분리된 쿼리문에서 양끝의 공백을 제거
    .map((query) => query.trim())
    // 유효한 쿼리문만 사용하도록 길이 확인
    .filter(query => query.length > 0);

    for (const query of queries) {
        // DB에 쿼리 적용
        await pools.query(query);
    }
}

// 테이블 형식 생성 
const createSchemas = async () => {
    // sql 폴더 주소 추출 
    const sqlDir = path.join(__dirname, '../sql');
    try {
        // 위의 함수를 통해 테이블 생성 쿼리문 적용
        await executeSqlFile(pools.USER_DB, path.join(sqlDir, 'user_db.sql'))
    } catch(e) {
        console.error("데이터 베이스 생성 오류",e)
    }
}

// 테이블 형식 생성 함수 호출
createSchemas().then(() => {
    // 실행이 잘되었으면 출력이후 안정적 종료
    console.log("데이터 베이스 생성 완료")
    process.exit(0);
}).catch((err) => {
    // 오류 발생 시 출력이후 강제 종료
    console.error(err);
    process.exit(1);
})