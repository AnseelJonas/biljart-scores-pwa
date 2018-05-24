import localforage from './localforage.min.js';

export class Club {
    constructor(id,name, location, contactPerson) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.contactPerson = contactPerson;
    }
}

let clubsStorage = localforage.createInstance({
    name: "biljart-app-clubs"
});

export function getClubPromise(id){
    return clubsStorage.getItem(id);
}

export function setClubPromise(club){
    const id = club.id.toString();
    return clubsStorage.setItem(id, club);
}

export function getClubsPromise(){
    const clubs = [];
    return clubsStorage.iterate(value=>{
        if (value.id){
            clubs.push(value);
        }
    }).then(() => {
        return clubs;
    })
}

export function removeClubPromise(id){
    return clubsStorage.removeItem(id);
}

export function getNumberOfClubsPromise(){
    return clubsStorage.length();
}

export function newIDPromise(){
    let newID;
    return Promise.resolve()
        .then(() => clubsStorage.getItem('nextID'))
        .then(id => id || 1)
        .then(id =>{
            newID = id;
            clubsStorage.setItem('nextID', id + 1);
        }).then(() => newID);
}