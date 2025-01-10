import Game from "../classes/models/game.class.js";
import { games } from "./session.js";


export const createGame = async () => {
    const game = new Game();
    games.set(game.id, game);
    console.log("게임 인스턴스 생성 완료")

    return game
}

