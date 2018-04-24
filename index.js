const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');


require('./models/User');
const keys = require('./config/keys');
//need to load User before passport otherwise Schema couldnt been found
require('./services/passport');
mongoose.connect(keys.mongoURI);

require('./routes/authRoutes')(app);




const app = express();


// BodyParser middleware parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cookieSession({
    // cookie last for 30 days
    maxAge: 10 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// Express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());



// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars for Flash messages
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); // for passport sets its own error message on error
  res.locals.user = req.user || null;
  next();
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
