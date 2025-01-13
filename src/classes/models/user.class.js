import { createPing } from "../../utils/notification/createNotification.js";

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
    }      

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
        this.lastUpdateTime = Date.now();
    }

    updateSocket(socket) {
        this.socket = socket;
        this.lastUpdateTime = Date.now();
    }

    getNextSequence() {
        return ++this.sequence;
    }

    updateGameId(gameId) {
        this.gameId = gameId
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
        console.log(this.latency)
    }

}

export default User