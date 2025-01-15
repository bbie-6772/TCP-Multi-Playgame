import { v4 as uuid4} from 'uuid'
import IntervalManager from '../mangers/interval.manger.js';

class Game {
    constructor() {
        this.id = uuid4();
        this.users = new Map();
        this.intervals = new IntervalManager()
        this.isStart = false;
        this.intervals.addInterval(this.id, this.getAllLocation, 200)
    }
    
    addUser(user) {
        user.updateGame(this.id, this.users.size)
        this.users.set(user.id, user)
        this.intervals.addInterval(user.id, user.ping, 200)
    }

    removeUser(userId){
        this.users.delete(userId)
        this.intervals.removePlayer(userId)
    }

    updateUser(user) {
        this.intervals.removePlayer(user.id)
        this.intervals.addInterval(user.id, user.ping, 200)
    }

    startGame() {
        this.isStart = true;

    }

    getMaxLatency() {
        this.users.reduce((max, user) => user.latency > max ? user.latency : max )
    }

    getAllLocation = () => {
        if(this.users.size <= 0) return
        // 게임 내 전체 유저 위치 확인
        const locations = Array.from(this.users).map(([id, user]) => {
            {
                return {
                    id: user.id,
                    playerId: user.playerId,
                    x: user.x,
                    y: user.y,
                }
            }
        })
        const packet = createLocation({ users: locations })

        // 위치 정보 동기화
        this.users.forEach((user) => user.socket.write(packet))
    }
}

export default Game