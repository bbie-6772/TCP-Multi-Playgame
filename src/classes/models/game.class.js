import { createLocationNotification, gameStartNotification } from "../../utils/notification/game.notification.js";
import IntervalManager from "../managers/interval.manager.js";

const MAX_PLAYERS = 2;

class Game {
    constructor(id){
        this.id = id;
        this.users = [];
        this.intervalManager = new IntervalManager();
        // 'waiting' or 'inProgress' 대기 / 실행중 구분
        this.state = "waiting";
    }
    
    addUser(user){
        if (this.users.length >= MAX_PLAYERS) throw new Error("Max players reached");
        else this.users.push(user);

        this.intervalManager.addPlayer(user.id, user.ping, 1000);
        if (this.users.length === MAX_PLAYERS) {
            setTimeout(() => {
                this.startGame();
            }, 3000);
        }
    }

    getUser(userId){
        return this.users.find(user => user.id === userId);
    }

    removeUser(userId){
        this.users = this.users.filter(user => user.id !== userId);
        this.intervalManager.removePlayer(userId);
    }

    getMaxLatency(){
        return this.users.reduce((max, user) => {
            return user.latency > max ? user.latency : max;
        }, 0);
    }

    startGame() {
        this.state = "inProgress";
        const startPacket = gameStartNotification(this.id, Date.now());
        console.log(this.getMaxLatency());

        this.users.forEach(user => {
            user.socket.write(startPacket);
        });

        if (this.users.length < MAX_PLAYERS) this.state = "waiting";
    }   

    getAllLocation() {
        const maxLatency = this.getMaxLatency();

        const locationData = this.users.map(user => {
            return {
                id: user.id,
                ...user.calculatePosition(maxLatency)
            }
        })

        return createLocationNotification(locationData);
    }
}

export default Game;