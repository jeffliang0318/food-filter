const mongoose = require('mongoose');
// const { Schema } = mongoose
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  
  // START CREATING REGULAR LOGIN
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true // make sure no space at front and end
  },
  username: {
    type: String,
    unique: true,
    required: true,
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

mongoose.model('users', userSchema);




// module.exports = User;
