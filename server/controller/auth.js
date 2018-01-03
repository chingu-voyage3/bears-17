const passport = require('koa-passport');
const User = require('../models/user.js');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({ name: profile.displayName })
     .then((res) => {
      if(!res) {
         const user = new User({ name: profile.displayName });
         user.save();
         return done(null, user);
      }
      return done(null, res);
  });

  console.log(accessToken, refreshToken)
  console.log('profile', profile)
  done(null, {name: 'test'})
}
));
