const passport = require('koa-passport');
const User = require('../models/user.js');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(((username, password, done) => {
  // retrieve user ...

  User.findOne({ name: username }, (err, data) => {
    console.log(data);

    if (!data) {
      return done(null, false);
    }
    done(null, { user: username, password: 'moose' });
  });
})));
