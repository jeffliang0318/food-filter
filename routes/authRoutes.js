const passport = require('passport');
const express = require('express');
const localStrategy = require('passport-local').Strategy;
//START REGULAR ROUTES
const mongoose = require('mongoose');
const User = mongoose.model('users'); // Is this the right the way to get User class from model?
//users refer to the collection in the mongoDB database; .model makes a copy of the schema

module.exports = app => {
  // Get Homepage
app.get('/', ensureAuthenticated, function(req, res){
	res.render('index'); // Render index view;
});

// Register
app.get('/register', function (req, res) {
	res.render('register');
});

// Login
app.get('/login', function (req, res) {
	res.render('login');
});

// Register User
app.post('/register', function (req, res) {
	let name = req.body.name;
	let email = req.body.email;
	let username = req.body.username;
	let password = req.body.password;
	let password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: {
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: {
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('register', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						name: name,
						email: email,
						username: username,
						password: password
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
         	req.flash('success_msg', 'You are registered and can now login');
					res.redirect('/login');
				}
			});
		});
	}
});


app.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	});


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
    // console.log(req);
    // console.log(res);
    const body = req.body;
    // const body = req.res;
    console.log(body);
    const  ingredient  = req.body;
    req.user.allergyIngredient = ingredient;
    const user = await req.user.save();

    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
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
