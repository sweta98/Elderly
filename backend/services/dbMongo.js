const mongoose = require('mongoose')
const encryptor = require('../controllers/encryptor')
const DBURL = "mongodb+srv://sridelderly:18658svgenie@maincluster.ovf8aqy.mongodb.net/?retryWrites=true&w=majority"
const  ObjectId = require('mongodb').ObjectId;

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

        this.User = require("./mongoose/userModel");
        this.Needs = require("./mongoose/needsModel");
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

    /*  USER  */

    addUser(user) {
        const newUser = new this.User({
            username: user.username,
            role: user.role,
            status: user.status
        });
        newUser.setPassword(user.password);
        try {
            return newUser.save()
        } catch (err) {
            throw err;
        }
    }

  validateUser(username, password) {
    return this.User.findOne({ username: username })
      .then((user) => {
        if (!user || !user.validPassword(password)) {
          throw { message: "Authentication failed. Invalid user or password." };
        }
        return user;
      })
      .catch((err) => {
        throw err;
      });
  }

  /* MANAGE NEEDS */

  addNeed(need) {
    const newNeed = new this.Needs({
      resident: need.resident,
      need: need.need,
      priority: need.priority,
      status: need.status,
    });
    try {
      return newNeed.save();
    } catch (err) {
      throw err;
    }
  }

  getAllNeeds() {
    try {
      return this.Needs.find();
    } catch (err) {
      throw err;
    }
  }
  updateNeed(params, data) {
    const filter = {};
    if (data.status) {
      filter["status"] = data.status;
    }
    if (data.priority) {
      filter["priority"] = data.priority;
    }
    try {
      return this.Needs.updateOne(
        { resident: params.resident, need: params.need },
        filter
      );
    } catch (err) {
      throw err;
    }
  }
  deleteUserfromEvent(eventID, username){
    try{
        return this.Event.updateOne(
            { _id: ObjectId(eventID)},
            { $pull: {rsvp: username}});
    } catch(err){
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
          { _id: ObjectId(eventID)},
          { $push: {rsvp: username}});
  } catch(err){
      throw err;
  }

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
}

module.exports = DBMongo;
