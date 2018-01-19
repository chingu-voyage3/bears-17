const mongoose = require('mongoose');

const authSchema = mongoose.Schema(
  {
    twitterId: String,
    displayName: String,
    username: String,
    provider: String,
    token: String,
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
  },
);
const authModel = mongoose.model('Auth', authSchema);
module.exports = authModel;
