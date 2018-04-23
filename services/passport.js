// const keys = require('../config/keys');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('passport');
// const mongoose = require('mongoose');
// const User = mongoose.model('users');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user.id is user id not googleId, cause user might sign in in different strategy
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    // callback
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        //already exist
        return done(null, existingUser);
      }
      // make new user
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);