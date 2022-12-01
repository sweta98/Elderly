const mongoose = require('mongoose')
const encryptor = require('../controllers/encryptor')
const DBURL = "mongodb+srv://sridelderly:18658svgenie@maincluster.ovf8aqy.mongodb.net/?retryWrites=true&w=majority"

class DBMongo {
    constructor() {
        if (!this.stopAllConnections()) {
            console.error('Could not stop all connections')
            return;
        }

        // Connect to the main DB
        mongoose.connect(DBURL).then(() => 
        console.log(`Main Database Connected: ${DBURL}`))
        .catch(err => console.error('Main Database refused to connect：', err));

        this.User = require('./mongoose/userModel');

        //Require eventModel
        this.Event = require('./mongoose/eventModel');

    }

    async stopAllConnections() {
        const state = mongoose.connection.readyState;
        if (state == 1 || state == 2) {
            const connectionStopped = await mongoose.connection.close().then(() => {
            }).then(() => {
                return true;
            }).catch(err => {
                console.error('Database refused to connect：', err);
            });
            return connectionStopped;
        }
        return true;

    }

    /*  EVENT  */
    addEvent(event){ 
        const newEvent = new this.Event({
            title: event.title,
            description: event.description,
            location: event.location,
            date: event.date,
            start_time: event.start_time,
            end_time: event.end_time
        });
        try {
            return newEvent.save()
        } catch (err) {
            throw err;
        }
    }

    getAllEvents(){
        return this.Event.find({})
            .then(events => {
                return events;
            }).catch(err => {
                throw err;
            })
    }
    
    addUserToEvent(eventID, username){
        try{
            return this.Event.updateOne(
                { _id: eventID},
                { $push: {rsvp: username}});
        } catch(err){
            throw err;
        }

    }

    deleteUserfromEvent(eventID, username){
        try{
            return this.Event.updateOne(
                { _id: eventID},
                { $pull: {rsvp: username}});
        } catch(err){
            throw err;
        }
    }
}

module.exports = DBMongo;