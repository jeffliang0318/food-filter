// const keys = require('../config/keys');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('passport');
// const mongoose = require('mongoose');
// const User = mongoose.model('users');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const PassportLocalStrategy = require('passport-local');

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


// ADDING REGULAR LOGIN

passport.use(
  new PassportLocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, done) {
	User.authenticate(email, password, function(error, user){
		// write any kind of message you'd like.
		// The message will be displayed on the next page the user visits.
		// We're currently not displaying any success message for logging in.
		done(error, user, error ? { message: error.message } : null);
	});
}););

app.use(require('connect-flash')());
