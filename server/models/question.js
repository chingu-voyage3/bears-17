const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: String,
    votes: Number,
    author: {
      name: { type: String, required: true },
      avatar: String,
    },
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
  },
);

questionSchema.statics.getRandom = function getRandom(limit = 1) {
  return this.aggregate([{
    $sample: { size: +limit },
  }]);
};

const questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;
