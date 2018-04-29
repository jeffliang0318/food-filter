const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
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


passport.use('local-signup', new LocalStrategy(
  {
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
    },
  async (username, password, done) => {
    const user = await User.findOne({'local.username': username});
    if (user) {
      return done(null, false, { message: 'username already taken.' });
    }
    // create the user
    let newUser = new User();

    newUser.local.email = email;
    newUser.local.password = newUser.generateHash(password);
    console.log("!!!!!!!!!!!!");

    newUser.save().then(savedUser => done(null, savedUser));
    // const user = await new User({ googleId: profile.id,
    //   allergyIngredient:[], name: profile.name.givenName, email: profile.emails[0].value }).save();
    // return done(null, user);
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
      // console.log(profile);
      if (existingUser) {
        //already exist
        // console.log(profile.emails[0].value);
        return done(null, existingUser);
      }
      // make new user
      const user = await new User({ googleId: profile.id,
        allergyIngredient:[], name: profile.name.givenName, email: profile.emails[0].value }).save();
      return done(null, user);
    }
  )
);

passport.use('local-login',
  new LocalStrategy(
  {// by default, local strategy uses username and password
    usernameField : 'username',
    passwordField : 'password',
  },
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      debugger;
      // console.log(user);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      User.validPassword(password, user.password, function (isMatch) {
        if(isMatch) return done(null, user);
        return done(null, false, { message: 'Incorrect password.' });
      });
    });
  }
));
