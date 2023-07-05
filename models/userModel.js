const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, minLength: 3, required: true },
  password: { type: String, minLength: 8, required: true, maxLength: 20 },
  fullName: { type: String, minLength: 1, required: true },
  membershipStatus: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", UserSchema);
