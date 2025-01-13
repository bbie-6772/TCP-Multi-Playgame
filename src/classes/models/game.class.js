import { v4 as uuid4} from 'uuid'

class Game {
    constructor() {
        this.id = uuid4();
        this.users = new Map();
        this.isStart = false;
    }
    
    addUser(user) {
        user.updateGameId(this.id)
        this.users.set(user.id, user)
    }

    removeUser(userId){
        this.users.delete(userId)
    }

    startGame() {
        this.isStart = true;
    }

    getAllLocation () {

    }
}

export default Game