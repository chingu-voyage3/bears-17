const mongoose = require('mongoose');
const shortid = require('shortid');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  avatar: String,
  country: String,
  member_since: { type: Date, default: Date.now },
  introduction: String,
  user_id: { type: String, default: shortid.generate() },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
