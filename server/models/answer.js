const mongoose = require('mongoose');

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


const answerModel = mongoose.model('Answer', answerSchema);

module.exports = answerModel;
