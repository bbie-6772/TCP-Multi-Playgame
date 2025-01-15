import { v4 as uuid4} from 'uuid'
import IntervalManager from '../mangers/interval.manger.js';
import { createLocation } from '../../utils/notification/createNotification.js';

const LOCATION_SYNC_TIME = 200;

class Game {
    constructor() {
        this.id = uuid4();
        this.users = new Map();
        this.intervals = new IntervalManager()
        this.isStart = false;
        // 0.2s 당 위치 동기화 추가
        this.intervals.addInterval(this.id, this.notificationLocation, LOCATION_SYNC_TIME)
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
        this.intervals.removeInterval(user.id)
        this.intervals.addInterval(user.id, user.ping, 200)
        user.socket.write(this.getAllLocation())
    }

    startGame() {
        this.isStart = true;
    }

    getMaxLatency() {
        const maxLatency = Array.from(this.users).reduce((max, [id, user]) => user.latency > max ? user.latency : max,0)
        return maxLatency
    }

    getAllLocation() {
        if(this.users.size <= 0) return
        // 게임 내 전체 유저 위치 확인
        const locations = Array.from(this.users).map(([id, user]) => {
            {
                return {
                    id,
                    playerId: user.playerId,
                    ...user.calculatePosition(this.getMaxLatency(), LOCATION_SYNC_TIME)
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