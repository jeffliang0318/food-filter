const flash = require('connect-flash');
var User = require('../models/User');
const passport = require('passport');


module.exports = app => {

 	// Register User
  app.post('/users/register', function (req, res) {
    //
    const {email,username,name,password,password2} = req.body;
    _validateFrom(req);

	   var errors = req.validationErrors();


  	if (errors) {
      let errorsArr = Object.values(errors).map(function(obj){return obj.msg;});
      return res.status(422).json({ errors: errorsArr });

  	}
  	 else {
  	// 	User.findOne(
    //     {username: _processInput(username)},
    //     function(err, resUsername) {
		// 	    User.findOne(
    //         {email: _processInput(email)},
    //         function (err, resEmail) {
    //           _validateUserInfo(resUsername,resEmail,res);
    //       })
    //   })
    // }

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
						name: name,
						password: password
					});
					User.createUser(newUser, function (e, savedUser) {
            if (e) {
              return res.json({errors: e});
             } else {
               res.json(savedUser);
             }
					});
				}
			});
		});
	}




  });

  // login User
  app.post('/users/login',passport.authenticate('local'),
    (req, res) => {
      let user = req.user;
      res.redirect('/api/current_user');
  });

};





function _saveValidateUser(email, username, name, password ,res){
  var newUser = new User({
    email: email,
    username: username,
    name: name,
    password: password
  });

  User.createUser(newUser, function (e, savedUser) {
    if (e) {
      return res.json({errors: e});
     } else {
       res.json(savedUser);
     }
  });
}


function _isUserExisted(username, email) {
  if(username && !email) {
    return 'usernameTaken';
  }
  else if( !username && email ){
    return 'emailTaken';
  }
  else if ( username && email) {
    return 'bothTaken';
  } else {
    return 'goodToRegister';
  }
}


function _validateFrom(req) {
  req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
}

function _processInput(field) {
  return {"$regex": "^" + field + "\\b", "$options": "i"};
}


function _validateUserInfo(resUsername, resEmail, res){
  switch(_isUserExisted(resUsername, resEmail)) {
    case 'usernameTaken':
      return res.status(422).json({errors: ['Username is Taken']});
      break;
    case 'emailTaken':
      return res.status(422).json({errors: ['Email is Taken']});
      break;
    case 'bothTaken':
      return res.status(422)
                .json({errors: ['Username and Email are Taken']});
      break;
    case 'goodToRegister':
      _saveValidateUser(email, username, name, password ,res);
      break;
  }
}
