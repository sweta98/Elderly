
const mongoose = require('mongoose')
const encryptor = require('../../controllers/encryptor')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        // index: true,
        unique: true,
        trim: true
    },
    // password:{
    //     type: String,
    //     required: true
    // },
    role:{
        type: String,
        required: true
    },
    online:{
        type: Boolean,
        default: false
    }
})
//
// UserSchema.methods.setPassword = function(password) {
//     this.password = encryptor.encrypt(password);
// };
//
// UserSchema.methods.validPassword = function(password) {
//     return encryptor.validate(password, this.password);
// };


module.exports = mongoose.model('User', UserSchema)