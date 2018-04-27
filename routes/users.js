var User = require('../models/User');
module.exports = app => {
  app.get('/users/register',
    (req, res) => {
     req.logout();
     // redirect to index after logout
     res.redirect('/foo/bar');
   }
 );

// Register User
app.post('/users/register', (req, res) => {
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
						if (err) throw err;
						console.log(user);
					});
					res.redirect('/orange');

});

};
