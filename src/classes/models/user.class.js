import { games, users } from "../../session.js";
import { createPing } from "../../utils/notification/createNotification.js";

class User {
    constructor(id, socket, latency, speed) {
        this.id = id;
        this.socket = socket;
        this.x = 0;
        this.y = 0;
        this.direct = 0;
        this.latency = latency;
        this.speed = speed;
        this.sequence = 0;
        this.lastUpdateTime = Date.now();
        this.gameId = null;
        this.playerId = null;
    }      

    getNextSequence() {
        return ++this.sequence;
    }

    updatePosition(x, y) {
        //아크 탄젠트(atan2)로 360도 범위의 방향을 얻음
        this.direct = Math.atan2(y - this.y,x - this.x);
        this.x = x;
        this.y = y;
        this.lastUpdateTime = Date.now();
    }

    updateSocket(socket) {
        // 기존 접속 종료
        this.socket.destroy()
        // 새로운 접속 할당
        users.updateSocket(this.id, this.socket, socket)
        this.socket = socket;
        this.lastUpdateTime = Date.now();
        // 게임에 접속 중이였을 때
        if (this.gameId) {
            const game = games.games.get(this.gameId)
            // 게임의 Ping / Location Interval을 재할당
            game.updateUser(this)
        }
    }

    updateSpeed(speed) {
        if(speed >= 0) this.speed = speed
    }

    updateGame(gameId, playerId) {
        this.gameId = gameId;
        this.playerId = playerId;
    }

    // 추측항법 시 사용
    calculatePosition() {
        // 지연시간을 이용해 계산 (밀리초 단위)
        const timeDiff = this.latency / 1000

        const nextX = this.x + this.speed * Math.cos(this.direct) * timeDiff
        const nextY = this.y + this.speed * Math.sin(this.direct) * timeDiff

        return {x: nextX, y:nextY }
    }

    ping = () => {
        // 패킷을 보내는 시간을 Payload 로 클라이언트에게 수신
        const pingPacket = createPing()
        this.socket.write(pingPacket)
    }

    pong ({timestamp}) {
        const now = Date.now()
        // 현재 시간과 받아온 시간으로 지연시간 계산
        this.latency = (now - timestamp) / 2;
    }

}

export default User