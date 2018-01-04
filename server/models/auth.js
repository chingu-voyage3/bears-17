const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authSchema = mongoose.Schema(
  {
    local: {
      name: String,
      email: String,
      password: String,
    },
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String,
      username: String,
    },
    twitter: {
      id: String,
      token: String,
      displayName: String,
      username: String,
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String,
    },
    github: {
      id: String,
      token: String,
      name: String,
      email: String,
    },
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
  },
);

authSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

authSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

const authModel = mongoose.model('Auth', authSchema);

module.exports = authModel;
