import { createPingPacket } from "../../utils/notification/game.notification.js";

class User {
    constructor(id, socket) {
        this.id = id;
        this.socket = socket;
        this.x = 0;
        this.y = 0;
        this.latency = 0;
        this.sequence = 0;
        this.lastUpdateTime = Date.now();
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
        this.lastUpdateTime = Date.now();
    }

    getNextSequence() {
        return ++this.sequence;
    }

    ping = () => {
        const now = Date.now();
        console.log(`ping: ${this.id}`);

        this.socket.write(createPingPacket(now));
    }

    handlePong (data) {
        const now = Date.now();
        this.latency = (now - data.timestamp) / 2;
        console.log(`pong: ${this.id}, latency: ${this.latency}`);
    }

    calculatePosition(latency) {
        // 초 단위 변환 
        const timeDiff = latency / 1000;
        // 속도는 임시로 1로 설정
        const speed = 1;
        const distance = timeDiff * speed;

        return {
            x: this.x + distance,
            y: this.y
        }
    }
}

export default User;