const mongoose = require('mongoose');

const authSchema = mongoose.Schema(
  {
    twitter: {
      id: String,
      displayName: String,
      username: String,
    },
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
  },
);
const authModel = mongoose.model('Auth', authSchema);
module.exports = authModel;
