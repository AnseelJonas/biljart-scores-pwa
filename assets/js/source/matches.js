import localforage from './localforage.min.js'

export class PlayerInMatch{
    constructor(player){
        this.player = player;
        this.points = [];
    }

    isWon(){
        return this.getPointsMade() >= this.getTotalPointsToMake();
    }

    getNumberOfMoves(){
        return this.points.length;
    }

    getPointsMade(){
        return this.points.reduce((a, b) => a + b, 0);
    }

    getLastPoints(n){
        return this.points.slice(-n);
    }

    getPointsStillToMake(){
        return this.getTotalPointsToMake() - getPointsMade();
    }

    getTotalPointsToMake(){
         return this.player.handicap;
    }

    getPercentageOfPointsMade(){
        return Math.round(this.getPointsMade() / this.getTotalPointsToMake() * 100) || 0; 
    }

    getAverage(){
        return Math.round(this.getPointsMade() / this.points.length) || 0;
    }

    getHighestPoint(){
        return this.points.length ? Math.max.apply(null, this.points) : 0;
    }
}

export class Match{
    constructor(id, player1, player2){
        this.id = id;
        this.playerInMatch1 = new PlayerInMatch(player1);
        this.playerInMatch2 = new PlayerInMatch(player2);

        this.player1Starts = true;
        this.isCurrentPlayer1 = this.player1Starts;
        this.date = new Date();
    }

    getNumberOfMoves(){
        if(this.player1Starts){
            return this.playerInMatch1.getNumberOfMoves();
        }else{
            return this.playerInMatch2.getNumberOfMoves();
        }
    }

    getCurrentPlayer(){
        if(this.isCurrentPlayer1){
            return this.playerInMatch1;
        }else{
            return this.playerInMatch2;
        }
    }

    addMove(point){
        this.getCurrentPlayer().points.push(point);
        const won = this.getCurrentPlayer().isWon();
        if(!won){
            this.isCurrentPlayer1 = !this.isCurrentPlayer1;
        }
        
        return won;
    }

}


let matchesStorage = localforage.createInstance({
    name: "biljart-app-matches"
});

export function getMatchPromise(id){
    return matchesStorage.getItem(id);
}

export function setMatchPromise(match){
    const id = match.id.toString();
    return matchesStorage.setItem(id, match);
}

export function getMatchesPromise(){
    const matches = [];
    return matchesStorage.iterate(value=>{
        if (value.id){
            matches.push(value);
        }
    }).then(() => {
        return matches;
    })
}

export function getNumberOfMatchesPromise(){
    return matchesStorage.length();
}

export function newIDPromise(){
    let newID;
    return Promise.resolve()
        .then(() => matchesStorage.getItem('nextID'))
        .then(id => id || 1)
        .then(id =>{
            newID = id
            matchesStorage.setItem('nextID', id + 1)
        }).then(() => newID);
}