const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
  },
);

const questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;
