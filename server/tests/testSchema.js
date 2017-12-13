const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: String,
    votes: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
    collection: 'test',
  }
);

const authorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    avatar: String,
    country: String,
    member_since: { type: Date, default: Date.now },
    introduction: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  },
  {
    collection: 'test',
  },
);

const questionModel = mongoose.model('Question', questionSchema);
const authorModel = mongoose.model('Author', authorSchema);

module.exports = {
  Author: authorModel,
  Question: questionModel,
};

