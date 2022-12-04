const mongoose = require("mongoose");

const WishSchema = new mongoose.Schema({
  username: {
    // type: mongoose.Types.ObjectId, TODO: changed back when User feature complete
    type: String,
    required: true,
    trim: true,
    // ref: 'User'
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp:{
    type : Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Wish", WishSchema);
