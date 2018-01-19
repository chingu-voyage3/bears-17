const passport = require('koa-passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/auth.js');

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/twitter/callback'
},
(token, tokenSecret, profile, cb) => {
  User.findOrCreate({ twitterId: profile.id }, (err, user) => {
    //console.log(profile);
    return cb(err, user);
  });
}
));
