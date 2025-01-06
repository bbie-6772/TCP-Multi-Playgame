import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs'
import { packetNames } from '../protobuf/packetNames.js';

//현재 파일의 절대경로 찾기
const __filename = fileURLToPath(import.meta.url);
//디렉토리 경로(현재 파일위치) 추출
const __dirname = path.dirname(__filename);
// 현재 파일위치 기준으로 assets 폴더 찾기(../../ => 최상위 폴더로 이동)
const protoDir = path.join(__dirname, '../protobuf');

const getAllProtoFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        // 폴더 내부에 폴더가 있을 경우 재귀적으로 탐색
        if (fs.statSync(filePath).isDirectory()) {
            fileList = getAllProtoFiles(filePath, fileList);
        // .proto 파일인 경우만 추가
        } else if (path.extname(file) === '.proto') {
            fileList.push(filePath);
        }
    });

    return fileList;
};

const protoFiles = getAllProtoFiles(protoDir);

const protoMessages = {};

export const loadProtos = async () => {
    try {
        const root = new protobuf.Root();

        await Promise.all(protoFiles.map(async (file) => root.load(file)));
        
        // packetNames에 정의된 패킷 이름으로 메시지 타입을 찾아서 저장
        for (const [packageName, types] of Object.entries(packetNames)) { 
            protoMessages[packageName] = {};
            for (const [type, typeName] of Object.entries(types)) {
                protoMessages[packageName][type] = root.lookupType(typeName);
            }
        }

        console.log("Protobuf 파일 로드 성공")
    } catch (err) {
        console.error('Failed to load Protobuf: ' + err.message);
    }
}

export const getProtoMessages = () => {
    return {...protoMessages};
}