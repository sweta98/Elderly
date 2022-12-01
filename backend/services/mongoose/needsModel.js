const mongoose = require("mongoose");

const needsSchema = new mongoose.Schema({
  resident: {
    type: String,
    required: true,
    trim: true,
  },
  need: {
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
});

module.exports = mongoose.model("Needs", needsSchema);
