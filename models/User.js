const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const { Schema } = mongoose
const Schema = mongoose.Schema;

// START HASHING
const saltRounds = 10;


const userSchema = new Schema({
  googleId: String,
  allergyIngredient: [String],

	username: {
		type: String,
		index:true
	},
	password: {
		type: String,
    require: true
	},
	email: {
		type: String
	},
	name: {
		type: String
	}

});

var User = module.exports = mongoose.model('users', userSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(saltRounds, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(error, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
	User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

module.exports.validPassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
      callback(isMatch);
	});
};
