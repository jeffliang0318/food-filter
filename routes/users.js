const flash = require('connect-flash');
var User = require('../models/User');
const passport = require('passport');
const expressValidator = require('express-validator');


module.exports = app => {
  app.get('/users/register',
    (req, res) => {

     // redirect to index after logout
     res.redirect('/user');
   }
 );

// Register User

  app.post('/users/register', function (req, res) {

	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
    let errorsArr = Object.values(errors).map(function(obj){return obj.msg;});
      // console.log(errorsArr);
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
					return res.status(422).json({errors: ['Email or Username taken']});
				}
				else {
					var newUser = new User({
						email: email,
						username: username,
						password: password
					});
					User.createUser(newUser, function (e, savedUser) {
            console.log(res.body);
            if (e) {
              return res.json({errors: e});
             } else {
               return res.json(savedUser);
             }
					});

				}
			});
		});
	}
});

  app.post('/users/login',
   passport.authenticate('local-login'),
    (req, res) => {
      res.send(req.user);
    }
  );
};
