
const mongoose = require('mongoose')
const encryptor = require('../../controllers/encryptor')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role:{
        type: String,
        required: true
    },
    online:{
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('User', UserSchema)