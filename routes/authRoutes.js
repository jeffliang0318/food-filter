const passport = require('passport');
const express = require('express');
//START REGULAR ROUTES
const mongoose = require('mongoose');
const User = mongoose.model('users'); // Is this the right the way to get User class from model?
//users refer to the collection in the mongoDB database; .model makes a copy of the schema

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  //START REGULAR ROUTES

  app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });
  
  //POST route for updating data

  app.post('/api/login',
  passport.authenticate('local', { failureRedirect: '/api/login' }),
  function(req, res) {
    res.redirect('/');
  });
  app.post('/', function (req, res, next) {
    // confirm that user typed same password twice. passpord and passwordConf are two values under name property from FRONTEND
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err); // next to handle second callback
      // http://thecodebarbarian.com/mongoose-error-handling
      // next(new Error('woops'))? what is the difference? .
    }

    if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {

      let userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
      }

      //use schema.create to insert data into the db
      // Shortcut for saving one or more documents to the database. MyModel.create(docs) does new MyModel(doc).save() for every doc in docs.
      User.create(userData, function (err, user) {
        if (err) {
          return next(err)
        } else {
          return res.redirect('/profile');
        }
      });

    } else {
      var err = new Error('All fields have to be filled out');
      err.status = 400;
      return next(err);
    }

  });

}
