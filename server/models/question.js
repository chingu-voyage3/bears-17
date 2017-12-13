const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    title: {type: String, required: true },
    body: String,
    votes: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
  },
);

const questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;
