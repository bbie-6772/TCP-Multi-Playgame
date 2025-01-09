import { config } from "../config/config.js";
import { formatDate } from "../utils/dateFormatter.js";
import mysql from 'mysql2/promise'

// 환경변수 모음집 config 에서 db 관련 값 가져오기
const { databases } = config;

// Connection Pool 생성 함수
const createPool = (dbConfig) => {
    // mysql2 라이브러리의 createPool() 메서드 사용
    const pool = mysql.createPool({
        // 호스트 주소 
        host: dbConfig.host,
        // 포트 번호 
        port: dbConfig.port,
        // 접속 사용자 이름
        user: dbConfig.user,
        // 비밀번호
        password: dbConfig.password,
        // DB 이름 
        database: dbConfig.name,
        // 연결 대기 동작 설정 (true = 대기가능, false = 바로 오류 반환)
        waitForConnections: true,
        // 커넥션 풀에서 최대 연결 수
        connectionLimit: 10, 
        // 연결 대기열 제한 (0일 경우 대기열 수가 무제한)
        queueLimit: 0, 
    })   
    
    // 원본 query 메서드 백업
    const originQuery = pool.query;

    // poo.query 오버라이드
    pool.query = (sql, params) => {
        // 실행된 날짜 확인
        const date = new Date();

        // 확인용 로그 띄우기
        console.log(`${formatDate(date)} / ${sql} / ${params && JSON.stringify(params)}`)

        // 백업된 기존의 query 메서드를 사용하여 query 진행 
        return originQuery.call(pool, sql, params);
    }

    //생성한 Connection Pool 반환
    return pool;
}

const pools = {
    // 사용할 DB의 Connection Pool 생성 및 저장
    GAME_DB: createPool(databases.GAME_DB),
    USER_DB: createPool(databases.USER_DB),
}

export default pools;