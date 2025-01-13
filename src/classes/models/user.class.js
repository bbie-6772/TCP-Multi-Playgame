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

    updateLatency(latency) {
        this.latency = latency;
    }

    getNextSequence() {
        return ++this.sequence;
    }
}

export default User