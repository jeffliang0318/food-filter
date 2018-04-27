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


app.post('/users/login',
 passport.authenticate('local',
  { failureFlash: 'Invalid username or password.' }),
  (req, res) => {
    req.flash();
    let user = req.user;
    res.redirect('/api/current_user');
  });

};
