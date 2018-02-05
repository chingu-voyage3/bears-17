const passport = require('koa-passport');
const Auth = require('../models/auth.js');
const User = require('../models/user.js');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy('local', ((username, password, done) => {
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

passport.use('signup', new LocalStrategy(((username, password, done) => {
  Auth.findOne({ 'local.name': username }, (err, user) => {
    if (!user) {
      const newAuth = new Auth({
        local: {
          name: username,
          password,
        },
      });

      return newAuth.save((error) => {
        if (error) {
          return done(null, false);
        }

        // save a new profile

        const profile = new User({ _id: newAuth._id, name: username });
        profile.save((userError) => {
          if (userError) return done(null, false);
          return done(null, profile);
        });
      });
    }
    return done(null, false);
  });
})));
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  },
  ((accessToken, refreshToken, profile, done) => {
    Auth.findOne({ 'google.id': profile.id })
      .then((res) => {
        if (!res) {
          const auth = new Auth({ 'google.name': profile.displayName, 'google.id': profile.id });
          auth.save((error) => {
            if (error) return done(null, false);
            const user = new User({ _id: auth._id, name: profile.displayName });
            user.save((userError) => {
              if (userError) return done(null, false);
              return done(null, user);
            });
          });
        }
        return done(null, res);
      });
  }),
));
