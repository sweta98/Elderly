
const mongoose = require('mongoose')
const encryptor = require('../../controllers/encryptor')


/* Tentative Code Definition

STATUS CODE
#UNDEFINED     -1  // The user has not proved any status info.
#OK             0  // I am OK: I do not need help  
#HELP           1  // I need help, but this is not a life threatening emergency
#EMERGENCY      2  // I need help now: this is a life threatening emergency

ROLE CODE 
#CITIZEN        0  // official member
#COORDINATOR    1  // can post announcement
#ADMINISTER     2  // can modify data

*/

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        index: true,
        unique: true,
        minLength: 3,
        trim: true
    },
    password:{   
        type: String, 
        required: true
    },
    status:{
        type: Number,
        integer: true,
        get: v => Math.round(v),
        set: v => Math.round(v),
        default: -1
    },
    role:{
        type: Number,
        integer: true,
        get: v => Math.round(v),
        set: v => Math.round(v),
        default: 0
    },
    online:{
        type: Boolean,
        default: false
    },
    acknowledged:{
        type: Boolean,
        default: false
    },
    shelter:{
        type:String,
        default: ''
    }, 
    badge:{
        type: String,
        default:null
    },
    active:{
        type: Boolean,
        default: true
    }
})

UserSchema.methods.setPassword = function(password) {
    this.password = encryptor.encrypt(password);
};

UserSchema.methods.validPassword = function(password) {
    return encryptor.validate(password, this.password);
};



module.exports = mongoose.model('User', UserSchema)