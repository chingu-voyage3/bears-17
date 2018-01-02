const passport = require('koa-passport');
const User = require('../models/user.js');
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy(((username, password, done) => {
  User.findOne({ name: username }, (err, user) => {
    if (!user) {
      return done(null, false);
    }

    return user.verifyPassword(password, (error, isMatch) => {
      if (err) {
        console.log(error);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
})));
