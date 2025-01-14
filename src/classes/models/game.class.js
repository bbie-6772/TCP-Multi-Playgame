import { v4 as uuid4} from 'uuid'
import IntervalManager from '../mangers/interval.manger.js';

class Game {
    constructor() {
        this.id = uuid4();
        this.users = new Map();
        this.intervals = new IntervalManager()
        this.isStart = false;
    }
    
    addUser(user) {
        user.updateGame(this.id, this.users.size)
        this.users.set(user.id, user)
        this.intervals.addInterval(user.id, user.ping, 200)
        this.intervals.addInterval(user.id, user.updateAllLocation, 200, "location")
    }

    removeUser(userId){
        this.users.delete(userId)
        this.intervals.removePlayer(userId)
    }

    startGame() {
        this.isStart = true;

    }

    getMaxLatency() {
        this.users.reduce((max, user) => user.latency > max ? user.latency : max )
    }

    getAllLocation (playerId) {
        // 게임 내 전체 유저 위치 확인
        const payload = Array.from(this.users).map(([id, user]) => {
            {
                return {
                    id: user.id,
                    playerId: user.playerId,
                    x: user.x,
                    y: user.y,
                }
            }
        })
        return { users: payload }
    }
}

export default Game