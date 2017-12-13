const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  avatar: String,
  country: String,
  member_since: {type: Date, default: Date.now },
  introduction: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

const authorModel = mongoose.model('Author', authorSchema);

module.exports = authorModel;
