const flash = require('connect-flash');
var User = require('../models/User');
const passport = require('passport');


module.exports = app => {

  app.get('/users/register',
    (req, res) => {
     req.logout();
     // redirect to index after logout
     res.redirect('/foo/bar');
   }
 );

// Register User
app.post('/users/register',
          passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
          (req, res) => {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;


	// Validation
	// req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('email', 'Email is required').notEmpty();
	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('username', 'Username is required').notEmpty();
	// req.checkBody('password', 'Password is required').notEmpty();
	// req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  //
	// var errors = req.validationErrors();
  //
	// if (errors) {
	// 	res.render('register', {
	// 		errors: errors
	// 	});
	// }
	// else {
	// 	//checking for email and username are already taken
	// 	User.findOne({ username: {
	// 		"$regex": "^" + username + "\\b", "$options": "i"
	// }}, function (err, user) {
	// 		User.findOne({ email: {
	// 			"$regex": "^" + email + "\\b", "$options": "i"
	// 	}}, function (err, mail) {
	// 			if (user || mail) {
	// 				res.render('register', {
	// 					user: user,
	// 					mail: mail
	// 				});
	// 			}
	// 			else {
  var newUser = new User({
						name: name,
						email: email,
						username: username,
						password: password
					});
	User.createUser(newUser, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
	});


  // app.post('/login',
  // 	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
  // 	function (req, res) {
  // 		res.redirect('/');
  // 	});

 	// req.flash('success_msg', 'You are registered and can now login');
  // console.log(req.locals);
	// res.redirect('/');
	// 			}
	// 		});
	// 	});
	// }
});

// var express = require('express');
// var router = express.Router()
// var User = require('../models/User');
// //
// // // Register
// // router.get('/register', function (req, res) {
// // 	res.render('register');
// // });
// //
// // // Login
// // router.get('/login', function (req, res) {
// // 	res.render('login');
// // });
// //

//
//
// app.post('/login',
// 	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
// 	function (req, res) {
// 		res.redirect('/');
// 	});
// //
// // router.get('/logout', function (req, res) {
// // 	req.logout();
// //
// // 	req.flash('success_msg', 'You are logged out');
// //
// // 	res.redirect('/users/login');
// // });
// //
// module.exports = router;
};
