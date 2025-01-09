import fs from 'fs';
import path from 'path';
import protobuf from 'protobufjs';
import { fileURLToPath } from 'url';
import { packetNames } from '../protobuf/packetNames.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const protoDir = path.join(__dirname,'../protobuf');
const protoMessages = {};

const getAllProtoFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir)

    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) fileList = getAllProtoFiles(filePath, fileList)
        else if (path.extname(file) === '.proto') fileList.push(filePath);
    }

    return fileList
}

const protoFiles = getAllProtoFiles(protoDir);

export const loadProtobufs = async () => {
    try {
        const root = new protobuf.Root();
        await Promise.all(protoFiles.map(async (file) => root.load(file)));

        for (const [packageName, types] of Object.entries(packetNames)) {
            protoMessages[packageName] = {};
            for (const [type, typeName] of Object.entries(types)){
                protoMessages[packageName][type] = root.lookupType(typeName) 
            }
        }
    } catch (e) {
        console.error(e)
    }
}

export const getProtoMessages = () => {
    return {...protoMessages}
}
