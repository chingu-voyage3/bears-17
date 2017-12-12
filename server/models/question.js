const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  _id: {
    $oid: ObjectId,
  },
  submitted_at: Date.now(),
  title: String,
  body: String,
  votes: Number,
  author: {
    _id: {
      $oid: ObjectId()
    },
    name: String,
    avatar: String,
  }, 
  answers: [{
    _id: {
      $oid: String
    },
    submitted_at: Date.now(),
    answer: String,
    votes: Number,
    author: {
      _id: {
        $oid: ObjectId()
      },
      name: String,
      avatar: String,
    }, 
  }],
});

const questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;
