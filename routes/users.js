const flash = require('connect-flash');
var User = require('../models/User');
const passport = require('passport');
// const expressValidator = require('express-validator');


module.exports = app => {
  app.get('/users/register',
    (req, res) => {
     req.logout();

     // redirect to index after logout
     res.redirect('/foo/bar');
   }
 );

// Register User

  app.post('/users/register', function (req, res) {

	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
  console.log(email, username, password);
	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
    let errorsArr = Object.values(errors).map(function(obj){return obj.msg;});
      console.log(errorsArr);
		return res.status(422).json({ errors: errorsArr });
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
					return res.status(422).json({errors: "Email or Username taken"});
				}
				else {
					var newUser = new User({
						email: email,
						username: username,
						password: password
					});
					User.createUser(newUser, function (e, savedUser) {
            if (e) {
              return res.json({errors: e});
             } else {
               console.log(savedUser);
               res.send(savedUser);
             }
					});

				}
			});
		});
	}
});

  app.post('/users/login',
   passport.authenticate('local',{ failureFlash: 'Invalid username or password.' }),
    (req, res) => {
      req.flash();
      let user = req.user;
      res.redirect('/api/current_user');
  });
};
