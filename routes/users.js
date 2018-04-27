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
app.post('/users/register',function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

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
});


app.get('/users/login', function (req, res) {
	console.log('login');
});


app.post('/users/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login'}),
  function (req, res) {
    res.redirect('/');
    console.log('login');
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
// //
// //
// module.exports = router;
};
