const mongoose = require('mongoose')

const TutorialSchema = new mongoose.Schema({
    app:{
        type: String,
        required: true,
        unique: true,
    },
    videoId:{
        type: String,
        required: true,
        unique: true,
    },
    enabled:{
        type: Boolean,
        required: true,
        default: false,
    }
})

module.exports = mongoose.model('Tutorial', TutorialSchema)