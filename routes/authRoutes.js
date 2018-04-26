const passport = require('passport');
const express = require('express');
const localStrategy = require('passport-local').Strategy;
//START REGULAR ROUTES
const mongoose = require('mongoose');
const User = mongoose.model('users'); 

module.exports = app => {

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // redirect to index after google auth
      res.redirect('/')
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/current_user', async (req, res) => {
    const body = req.body;
    // const body = req.res;
    const  ingredient  = req.body;
    req.user.allergyIngredient = ingredient;
    const user = await req.user.save();

    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    // req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });
};


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}
