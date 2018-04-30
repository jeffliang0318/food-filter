const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user.id is user id not googleId, cause user might sign in localy
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
  async (username, password, done) => {
    const user = await User.findOne({username: username});
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    User.validPassword(password, user.password, function (isMatch) {
      if(isMatch) return done(null, user);
      return done(null, false, { message: 'Incorrect password.' });
    });
  }
));
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
      const user = await new User({ googleId: profile.id,
        allergyIngredient:[], name: profile.name.givenName, email: profile.emails[0].value }).save();
      done(null, user);
    }
  )
);
