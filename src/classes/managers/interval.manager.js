import BaseManger from "./base.manager.js";

class IntervalManager extends BaseManger {
    constructor() {
        super();
        this.intervals = new Map();
    }

    addPlayer(playerId, callback, interval, type = "user") {
        if (!this.intervals.has(playerId)) {
            this.intervals.set(playerId, new Map());
        }
        this.intervals.get(playerId).set(type, setInterval(callback, interval));
    }

    removePlayer(playerId) {
        if(this.intervals.has(playerId)){
            this.intervals.get(playerId).forEach((intervalId) => {
                clearInterval(intervalId);
            });
            this.intervals.delete(playerId);
        }
    }

    clearAll(){
        this.intervals.forEach((intervals) => {
            intervals.forEach((intervalId) => {
                clearInterval(intervalId);
            });
        });
        this.intervals.clear();
    }   

    removeInterval(playerId, type = "user") {  
        if(this.intervals.has(playerId)){
            const userInterval = this.intervals.get(playerId);
            if(userInterval.has(type)){
                clearInterval(userInterval.get(type));
                userInterval.delete(type);
            }
        }
    }

    addUpdatePosition(playerId, callback, interval) {
        this.addPlayer(playerId, callback, interval, "position");
    }
 
    addGame (gameId, callback, interval) {
        this.addPlayer(gameId, callback, interval, "game");
    }
}

export default IntervalManager;