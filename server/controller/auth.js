const passport = require('koa-passport');
const Auth = require('../models/auth.js');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy(((username, password, done) => {
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
      if (!user) {
        const newUser = new Auth({
          local: {
            name: username,
            password: this.generateHash(password),
          },
        });

        newUser.save();
        return done(null, newUser);
      }

      return done(null, false);
    });
  }),
);
