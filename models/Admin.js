const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { // store hashed password
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Admin", adminSchema);
