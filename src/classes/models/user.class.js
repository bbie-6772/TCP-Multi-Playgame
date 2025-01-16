import { games, users } from "../../session.js";
import { createPing } from "../../utils/notification/createNotification.js";

class User {
    constructor(id, socket, latency, speed) {
        this.id = id;
        this.socket = socket;
        this.x = 0;
        this.y = 0;
        this.directX = 0;
        this.directY = 0;
        this.timestamp = null;
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

    updateDirection({ directions, timestamp }) {
        const decode = {
            // 1 byte 에 0(위) 0(아래) 0(왼쪽) 0(오른쪽) 형식으로 입력키를 받음
            up: directions & 1 ? 1 : 0,
            down: directions & 2 ? 1 : 0,
            left: directions & 4 ? 1 : 0,
            right: directions & 8 ? 1 : 0
        }

        const axisX = decode.right - decode.left
        const axisY = decode.up - decode.down
        const vectorSize = Math.sqrt((axisX ** 2) + (axisY ** 2))

        this.directX = vectorSize > 0 ? axisX / vectorSize : 0
        this.directY = vectorSize > 0 ? axisY / vectorSize : 0
        this.timestamp = timestamp
    }

    updatePosition({ x, y, timestamp }) {
        const game = games.games.get(this.gameId)
        // 입력도 가장 높은 지연시간을 만족하여야 입력되도록
        if (Date.now() - timestamp < game.getMaxLatency()) return this.updatePosition({ x, y, timestamp })

        // 시간 간격 확인
        const timeDiff = (timestamp - this.timestamp) / 1000
        // 이전에 계산해둔 방향을 토대로 현재 위치 계산
        const nextX = this.x + this.speed * this.directX * timeDiff
        const nextY = this.y + this.speed * this.directY * timeDiff

        // 오차범위 10% 로 적합 시 위치 적용
        if (Math.abs(nextX - x) <= Math.abs(x * 0.1)) this.x = x;
        if (Math.abs(nextY - y) <= Math.abs(y * 0.1)) this.y = y;

        console.log("계산", nextX, nextY, "진짜",x, y)
        console.log("현재위치", this.x, this.y, timeDiff,"초")
        this.timestamp = timestamp
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

    // 추측항법
    calculatePosition(intervalTime, maxLatency) {
        // 경과시간 + 지연시간을 이용해 계산 (초 단위)
        const timeDiff = (intervalTime + maxLatency) / 1000

        const nextX = this.x + this.speed * this.directX * timeDiff
        const nextY = this.y + this.speed * this.directY * timeDiff

        // 추측항법 적용
        this.x = nextX
        this.y = nextY

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