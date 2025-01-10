import { createGame } from "../session/game.session.js";
import { loadProtobufs } from "./loadProtobuf.js"

export const initServer = async () => {
    try {
        await createGame();
        await loadProtobufs();
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}