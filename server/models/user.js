const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  username: String,
  email: String,
  avatar: String,
  country: String,
  member_since: { type: Date, default: Date.now },
  introduction: String,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
