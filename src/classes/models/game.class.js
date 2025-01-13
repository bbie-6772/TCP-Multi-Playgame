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
        user.updateGameId(this.id)
        this.users.set(user.id, user)
        this.intervals.addPlayer(user.id, user.ping, 200)
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

    getAllLocation () {
        this.users.forEach((user) => {

        })
    }
}

export default Game