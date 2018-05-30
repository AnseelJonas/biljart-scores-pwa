import localforage from './localforage.min.js'

export class Player{
    constructor(id,name, licenseNumber, club, handicap){
        this.id = id;
        this.name = name;
        this.licenseNumber = licenseNumber;
        this.club = club;
        this.handicap = handicap;
    }
}

let playersStorage = localforage.createInstance({
    name: "biljart-app-players"
});

export function getPlayerPromise(id){
    return playersStorage.getItem(id);
}

export function setPlayerPromise(player){
    const id = player.id.toString();
    return playersStorage.setItem(id, player);
}

export function getPlayersPromise(){
    const players = [];
    return playersStorage.iterate(value=>{
        if (value.id){
            players.push(value);
        }
    }).then(() => {
        return players;
    })
}

export function removePlayerPromise(id){
    return playersStorage.removeItem(id);
}

export function getNumberOfPlayersPromise(){
    return playersStorage.length();
}

export function newIDPromise(){
    let newID;
    return Promise.resolve()
        .then(() => playersStorage.getItem('nextID'))
        .then(id => id || 1)
        .then(id =>{
            newID = id;
            playersStorage.setItem('nextID', id + 1);
        }).then(() => newID);
}