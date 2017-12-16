const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: String,
    votes: Number,
    author: {
      name: String,
      avatar: String,
    },
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
    collection: 'test questions',
  },
);

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    avatar: String,
    country: String,
    member_since: { type: Date, default: Date.now },
    introduction: String,
  },
  {
    collection: 'test users',
  },
);

const answerSchema = mongoose.Schema(
  {
    question_id: { type: String, required: true },
    body: String,
    votes: Number,
    author: {
      _id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
  },
);

const questionModel = mongoose.model('Question', questionSchema);
const userModel = mongoose.model('User', userSchema);
const answerModel = mongoose.model('Answer', answerSchema);

module.exports = {
  User: userModel,
  Question: questionModel,
  Answer: answerModel,
};
