class IntervalManager {
    constructor() {
        this.intervals = new Map();
    }

    addPlayer(playerId, callback, intervals, type = "user") {
        if(!this.intervals.has(playerId)) {
            this.intervals.set(playerId, new Map());
        }

        this.intervals.get(playerId).set(type, setInterval(callback, intervals));
    }

    removePlayer(playerId) {
        if (this.intervals.has(playerId)) {
            this.intervals.get(playerId).forEach((interval) => {
                clearInterval(interval)
            })
        }

        this.intervals.delete(playerId)
    }

    clearAll() {
        this.intervals.forEach((intervals) => {
            intervals.forEach((interval) =>{
                clearInterval(interval)
            })
        })
    }

    removeInterval(playerId, type = "user") {
        const userInterval = this.intervals.get(playerId)
        if (userInterval.has(type)) {
            clearInterval(userInterval.get(type))
            userInterval.delete(type)
        }
    }

}

export default IntervalManager