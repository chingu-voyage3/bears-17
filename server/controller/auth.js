const passport = require('koa-passport');
<<<<<<< HEAD
const User = require('../models/user.js');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
=======
const Auth = require('../models/auth.js');
const LocalStrategy = require('passport-local').Strategy;
>>>>>>> 63f436c93566474050394ab15898d2b10d3205de

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

passport.use(
  'local-register',
  new LocalStrategy((username, password, done) => {
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

          return done(null, newAuth);
        });
      }
      return done(null, false);
    });
  }),
);

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
