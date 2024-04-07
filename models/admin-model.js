const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
});

const Admin = new mongoose.model("Admin", userSchema);

module.exports = Admin;
