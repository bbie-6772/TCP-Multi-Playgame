import fs from 'fs';
import path from 'path';
import protobuf from 'protobufjs'
import { fileURLToPath } from 'url';
import { packetNames } from '../protobuf/packetNames.js';

//현재 파일의 절대경로 찾기
const __filename = fileURLToPath(import.meta.url);
//디렉토리 경로(현재 파일위치) 추출
const __dirname = path.dirname(__filename);
// 현재 파일위치 기준으로 protobuf 폴더 찾기
const protoDir = path.join(__dirname, '../protobuf');

// Proto 파일들 전부 불러오기
const getAllProtoFiles = (dir, fileList = []) => {
    // 지정된 주소(= protobuf 폴더)를 읽음
    const files = fs.readdirSync(dir);

    // 폴더 내에 있는 요소들을 전부 확인
    files.forEach(file => {
        // 요소(파일 또는 폴더)와 현재주소(protobuf 폴더)를 묶은 주소를 저장
        const filePath = path.join(dir, file);
        // 폴더 내부에 폴더가 있을 경우 재귀적으로 탐색
        if (fs.statSync(filePath).isDirectory()) {
            fileList = getAllProtoFiles(filePath, fileList);
        // 찾은 요소가 .proto 파일인 경우에만 추가 fileList에 추가
        } else if (path.extname(file) === '.proto') {
            fileList.push(filePath);
        }
    });

    return fileList;
};

// 모든 protobuf 의 proto 파일들을 불러왔음!(파일만 불러옴)
const protoFiles = getAllProtoFiles(protoDir);

// 불러온 Proto 파일들을 Message 별로 분리하는 객체
const protoMessages = {};

export const loadProtos = async () => {
    try {
        //Protobuf Root 객체 생성
        const root = new protobuf.Root();

        //생성한 Protobuf Root에 파일들을 전부 로드
        await Promise.all(protoFiles.map(async (file) => root.load(file)));
        
        // packetNames에 정의된 패킷 이름으로 Message 타입을 찾아서 저장
        for (const [packageName, types] of Object.entries(packetNames)) { 
            // packageName = proto 파일명 , types = 파일에 포함된 Message들
            protoMessages[packageName] = {};
            for (const [type, typeName] of Object.entries(types)) {
                // Root 객체에서 typeName(='package(name).Message(name)')으로 
                // 찾은 Message를 protoMessages 객체에 분리하여 저장
                protoMessages[packageName][type] = root.lookupType(typeName);
            }
        }
        console.log("Protobuf 파일 로드 성공")
    } catch (err) {
        console.error('Failed to load Protobuf: ' + err.message);
    }
}

export const getProtoMessages = () => {
    // 얕은 복사 방지하며 반환
    return {...protoMessages};
}