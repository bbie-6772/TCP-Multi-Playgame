import Game from "./game.class.js";

class Games {
    constructor () {
        this.games = new Map();
    }

    createGame = async () => {
        const game = new Game();
        this.games.set(game.id, game);
        console.log("게임 인스턴스 생성 완료")
        return game.id
    }
}
    
export default Games;