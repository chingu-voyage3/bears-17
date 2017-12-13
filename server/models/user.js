const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  avatar: String,
  country: String,
  member_since: {type: Date, default: Date.now },
  introduction: String,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
