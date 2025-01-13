import { games } from "../session.js";
import { loadProtobufs } from "./loadProtobuf.js"

export const initServer = async () => {
    try {
        await games.createGame();
        await loadProtobufs();
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}