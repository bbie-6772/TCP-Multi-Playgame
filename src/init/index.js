import pools from "../db/database.js";
import { testAllConnections } from "../utils/db/testConnection.js";
import { loadGameAssets } from "./assets.js";
import { loadProtos } from "./loadProtos.js";

const initServer = async () => {
    try {
        // 게임 에셋 로드
        await loadGameAssets();
        // Proto 파일 로드 
        await loadProtos();
        // 모든 DB 연결 확인 
        await testAllConnections(pools);
    } catch (err) {
        console.error(err);
        // 오류 발생 시 시스템 강제종료
        process.exit(1);
    }
}

export default initServer;