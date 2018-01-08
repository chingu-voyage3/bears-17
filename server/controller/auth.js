const passport = require('koa-passport');
const Auth = require('../models/auth.js');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy('local', ((username, password, done) => {
  console.log('other local strat');
  Auth.findOne({ 'local.name': username }, (err, user) => {
    if (!user) {
      return done(null, false);
    }

    if (!user.validPassword(password)) {
      return done(null, false);
    }

    return done(null, user);
  });
})));

passport.use(
  'local-register',
  new LocalStrategy((username, password, done) => {
    Auth.findOne({ 'local.name': username }, (err, user) => {
      console.log(user, 'this is Auth.findOne results');
      if (!user) {
        const newAuth = new Auth({
          local: {
            name: username,
            password,
          },
        });

        return newAuth.save((error) => {
          if (error) {
            console.log(error, 'error during newUser Save');
            return done(null, false);
          }
          return done(null, newAuth);
        });
      }
      return done(null, false);
    });
  }),
);
