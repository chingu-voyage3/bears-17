const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

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

const hashPass = (next) => {
  const auth = this;

  // only hash the password if it has been modified (or is new)
  if (!auth.isModified('local.password')) return next();

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    return bcrypt.hash(auth.local.password, salt, (error, hash) => {
      if (err) return next(error);

      // override the cleartext password with the hashed one
      auth.local.password = hash;
      return next();
    });
  });
};

authSchema.pre('save', hashPass);

authSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

const authModel = mongoose.model('Auth', authSchema);

module.exports = authModel;
