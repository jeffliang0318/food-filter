// // const keys = require('../config/keys');
// // const GoogleStrategy = require('passport-google-oauth20').Strategy;
// // const passport = require('passport');
// // const mongoose = require('mongoose');
// // const User = mongoose.model('users');
//
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const PassportLocalStrategy = require('passport-local');
//
const mongoose = require('mongoose');
const keys = require('../config/keys');

// const User = mongoose.model('users');

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
      const user = await new User({ googleId: profile.id, allergyIngredient:[] }).save();
      done(null, user);
    }
  )
);

// //
// // // ADDING REGULAR LOGIN
// //
// // passport.use(new PassportLocalStrategy(
// //   function (username, password, done) {
// //     User.getUserByUsername(username, function (err, user) {
// //       if (err) throw err;
// //       if (!user) {
// //         return done(null, false, { message: 'Unknown User' });
// //       }
// //
// //       User.comparePassword(password, user.password, function (err, isMatch) {
// //         if (err) throw err;
// //         if (isMatch) {
// //           return done(null, user);
// //         } else {
// //           return done(null, false, { message: 'Invalid password' });
// //         }
// //       });
// //     });
// //   }));
