const mongoose = require('mongoose');
// const { Schema } = mongoose
const Schema = mongoose.Schema;

// START HASHING
var bcrypt = require('bcrypt');
const saltRounds = 10;


const userSchema = new Schema({
  googleId: String,

  // START CREATING REGULAR LOGIN
  email: {
    type: String,
    // index: { unique: true },
    // required: false,
    trim: true // make sure no space at front and end
  },
  username: {
    type: String,
    // index: { unique: true },
    // required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,

  },
  passwordConf: {
    type: String,
    required: true,
  },

  foodAllergies:{
    type:Array,
    validate: {
      validator: function() {
        return this.foodAllergies.length > 0;
      },
      message: 'Please submit food you are allergic to'
    }


  }

});


//hashing a password before saving it to the database
userSchema.pre('save', function(next) { // should I change save to create?
  let user = this; // why???

  if (!user.isModified('password')) return next(); // only hash when it is isModified

  bcrypt.genSalt(saltRounds, function(err, salt){
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;//overides the passpord
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

mongoose.model('users', userSchema);




// module.exports = User;
