
const passport = require('koa-passport');
const User = require('../models/user.js');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await User.find({ name: username })
      .then(() => done(null, user))
      .catch((err) => {
        done(err);
      });
  } catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy(((username, password, done) => {
  User.findOne({ name: username })
    .then((user) => {
      if (!user) {
        // no user
        return done(null, false);
      }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    })
    .catch(err => done(err));
})));
