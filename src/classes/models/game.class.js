import { v4 as uuid4} from 'uuid'
import IntervalManager from '../mangers/interval.manger.js';
import { createLocation } from '../../utils/notification/createNotification.js';

class Game {
    constructor() {
        this.id = uuid4();
        this.users = new Map();
        this.intervals = new IntervalManager()
        this.isStart = false;
        // 0.2s 당 위치 동기화 추가
        this.intervals.addInterval(this.id, this.notificationLocation, 200)
    }
    
    addUser(user) {
        user.updateGame(this.id, this.users.size)
        this.users.set(user.id, user)
        this.intervals.addInterval(user.id, user.ping, 200)
        user.socket.write(this.getAllLocation())
    }

    removeUser(userId){
        this.users.delete(userId)
        this.intervals.removePlayer(userId)
    }

    updateUser(user) {
        this.intervals.removeInterval(user.id)
        this.intervals.addInterval(user.id, user.ping, 200)
        user.socket.write(this.getAllLocation())
    }

    startGame() {
        this.isStart = true;
    }

    getMaxLatency() {
        this.users.reduce((max, user) => user.latency > max ? user.latency : max )
    }

    getAllLocation() {
        if(this.users.size <= 0) return
        // 게임 내 전체 유저 위치 확인
        const locations = Array.from(this.users).map(([id, user]) => {
            {
                return {
                    id,
                    playerId: user.playerId,
                    x: user.x,
                    y: user.y,
                }
            }
        })
        const packet = createLocation({ users: locations })

        return packet
    }

    notificationLocation = () => {
        this.users.forEach((user) => user.socket.write(this.getAllLocation()))
    }
}

export default Game