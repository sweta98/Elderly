const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


/*
WISH:
*/
const WishSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp:{
        type : Date,
        default: Date.now
    },
    content:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "wished"
    },
    priority: {
        type: String,
        // required: true
    },


})

WishSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Wish', WishSchema)
