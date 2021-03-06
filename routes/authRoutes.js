const passport = require('passport');
const express = require('express');
const localStrategy = require('passport-local').Strategy;
//START REGULAR ROUTES
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
  // send to google to do the authentication
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  // handle the callback after google has authenticated the user
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // redirect to index after google auth
      res.redirect('/user')
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/current_user', async (req, res) => {
    const  ingredient  = req.body;
    req.user.allergyIngredient = ingredient;
    const user = await req.user.save();

    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

};
