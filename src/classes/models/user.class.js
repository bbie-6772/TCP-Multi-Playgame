import { games } from "../../session.js";
import { createLocation, createPing } from "../../utils/notification/createNotification.js";

class User {
    constructor(id, socket, latency) {
        this.id = id;
        this.socket = socket;
        this.x = 0;
        this.y = 0;
        this.latency = latency;
        this.sequence = 0;
        this.lastUpdateTime = Date.now();
        this.gameId = null;
        this.playerId = null;
    }      

    getNextSequence() {
        return ++this.sequence;
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
        this.lastUpdateTime = Date.now();
    }

    updateSocket(socket) {
        // 기존 접속 종료
        this.socket.end()
        // 새로운 접속 할당
        this.socket = socket;
        this.lastUpdateTime = Date.now();
        // 게임에 접속 중이였을 때
        if (this.gameId) {
            const game = games.games.get(this.gameId)
            // 게임의 Ping / Location Interval을 재할당
            game.updateUser(this)
        }
    }

    updateGame(gameId, playerId) {
        this.gameId = gameId;
        this.playerId = playerId;
    }

    // 추측항법 시 사용
    calculatePosition(latency) {
        const timeDiff = latency /1000;
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