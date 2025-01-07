class BaseManger {
    constructor() {
        if (new.target === BaseManger) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    addPlayer(playerId, ...args) {
        throw new Error('Method not implemented');

    }

    removePlayer(playerId) {
        throw new Error('Method not implemented');
    }

    clearAll(){
        throw new Error('Method not implemented');
    }
}

export default BaseManger;