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
  profile: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: { createdAt: 'submitted_at', updatedAt: 'updated_at' },
  },
);

authSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('local.password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.local.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.local.password = hash;
      next();
    });
  });
});

authSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

const authModel = mongoose.model('Auth', authSchema);

module.exports = authModel;
