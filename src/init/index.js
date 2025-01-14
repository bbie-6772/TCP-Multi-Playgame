import pools from "../database/database.js";
import { games } from "../session.js";
import { testAllConnections } from "../utils/db/testConnection.js";
import { loadProtobufs } from "./loadProtobuf.js"

let gameId

export const initServer = async () => {
    try {
        gameId = await games.createGame();
        await loadProtobufs();
        await testAllConnections(pools);
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

export { gameId } 