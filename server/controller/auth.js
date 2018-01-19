const passport = require('koa-passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/auth.js');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/twitter/callback',
  },
  (token, tokenSecret, profile, cb) => {
    User.findOne({ twitterId: profile.id }, (err, user) => {
      console.log('cb: ', cb);
      if (err) return cb(err);
      else if (!user) {
        const user = new User({
          name: profile.displayName,
          username: profile.username,
          provider: 'twitter',
        });
        user.save((error) => {
          if (error) { return cb(null, false)}
          return cb(null, user);
        });
      } else {
        return cb(null, user);
      }
    });
  },
));
