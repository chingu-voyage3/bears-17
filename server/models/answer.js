const mongoose = require('mongoose');

const answerSchema = mongoose.Schema(
  {
    question_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    body: { type: String, required: true },
    votes: { type: Number, default: 0 },
    voted_by: Array,
    flagged_by: Array,
    author: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      username: String,
      avatar: String,
    },
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
  },
);

const answerModel = mongoose.model('Answer', answerSchema);

module.exports = answerModel;
