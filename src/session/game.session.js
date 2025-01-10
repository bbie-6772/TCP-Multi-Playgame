import Game from "../classes/models/game.class.js";
import { games } from "./session.js";


export const createGame = () => {
    const game = new Game();
    games.set(game.id, game);

    return game
}

