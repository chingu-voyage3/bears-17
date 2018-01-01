const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, require: true },
  email: String,
  avatar: String,
  country: String,
  member_since: { type: Date, default: Date.now },
  introduction: String,
});

userSchema.pre(save, function saltPass (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  // generate a salt

  bcrypt.getSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // has the password using our new salt

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(err);
      }

      // override he cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.verifyPassword = function verifyPassword(password, cb) {
  return bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
