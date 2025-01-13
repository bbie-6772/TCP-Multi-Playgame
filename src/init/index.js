import { games } from "../session.js";
import { loadProtobufs } from "./loadProtobuf.js"

let gameId

export const initServer = async () => {
    try {
         gameId = await games.createGame();
        await loadProtobufs();
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

export { gameId } 