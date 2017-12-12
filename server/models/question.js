const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  submitted_at: Date.now(),
  title: String,
  body: String,
  votes: Number,
  author: {
    _id: {
      $oid: ObjectId(),
    },
    name: String,
    avatar: String,
  },
});

const questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;
