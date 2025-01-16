import { v4 as uuid4} from 'uuid'
import IntervalManager from '../mangers/interval.manger.js';
import { createLocation } from '../../utils/notification/createNotification.js';

class Game {
    constructor() {
        this.id = uuid4();
        this.users = new Map();
        this.intervals = new IntervalManager()
        // 기본 위치 동기화 시간
        this.syncInterval = 100;
        this.isStart = false;
        this.intervals.addInterval(this.id, this.notificationLocation,this.syncInterval)
    }
    
    // setUpInterval() {
    //     // 위치 동기화 시간
    //     setTimeout(this.dynamicSyncInterval, this.syncInterval);
    // }

    // dynamicSyncInterval = () => {
    //     // 위치 동기화 실행
    //     if (this.users.size > 0) this.notificationLocation()

    //     // 최대 200ms 최소 50ms 간격으로 위치 동기화 간격 설정
    //     this.syncInterval = Math.max(50, Math.min(200,this.getMaxLatency()))

    //     // 새로운 timeOut으로 위치 동기화
    //     setTimeout(this.dynamicSyncInterval, this.syncInterval);
    // }

    addUser(user) {
        user.updateGame(this.id, this.users.size)
        this.users.set(user.id, user)
        this.intervals.addInterval(user.id, user.ping, 1000)
        if (!this.isStart) this.startGame();
    }

    removeUser(userId){
        this.users.delete(userId)
        this.intervals.removePlayer(userId)
    }

    updateUser(user) {
        this.intervals.removeInterval(user.id)
        this.intervals.addInterval(user.id, user.ping, 1000)
        user.socket.write(this.getAllLocation())
    }

    startGame() {
        this.isStart = true;
    }

    getMaxLatency() {
        const maxLatency = Array.from(this.users.values()).reduce((max, user) => user.latency > max ? user.latency : max,0)
        if(maxLatency > 100) return 100
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
                    ...user.calculatePosition(this.syncInterval, this.getMaxLatency())
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