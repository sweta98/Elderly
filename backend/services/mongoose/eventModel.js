
const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{   
        type: String, 
        required: true
    },
    location:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    start_time:{
        type: String,
        required: true
    },
    end_time:{
        type: String,
        required: true
    },
    rsvp:{
        type:Array,
        default: []
    }},{timestamps: true})


module.exports = mongoose.model('Event', EventSchema)