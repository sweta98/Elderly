const DAO = require('../services/DAO')


class Event {
    constructor(event){
        this.title = event.title
        this.description = event.description
        this.location = event.location
        this.date = event.date
        this.start_time = event.start_time
        this.end_time = event.end_time
    }

    static get db(){
        return DAO.db;
    }

    save(){
        return Event.db.addEvent({
            title: this.title,
            description: this.description,
            location: this.location,
            date: this.date,
            start_time: this.start_time,
            end_time: this.end_time
        });
    }

    static getAll(){
        return Event.db.getAllEvents();
    }

    /**
     * 
     * @param {string} eventID 
     * @param {dictionary} patch_body {username: string, add: boolean}
     * @returns 
     */
    static update(eventID, patch_body){
        let username = patch_body.username;
        if (patch_body.add){
            return Event.db.addUserToEvent(eventID, username);
        }
        return Event.db.deleteUserfromEvent(eventID, username);
    }

}

module.exports = Event;