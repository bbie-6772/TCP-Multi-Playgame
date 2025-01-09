import { loadProtobufs } from "./loadProtobuf.js"

export const initServer = async () => {
    try {
        await loadProtobufs();
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}