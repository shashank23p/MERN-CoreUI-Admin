const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  groups: {
    type: Array,
    default: ["member"],
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", UserSchema);
