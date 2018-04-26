const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
//need to load User before passport otherwise Schema couldnt been found
require('./services/passport');

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  cookieSession({
    // cookie last for 30 days
    maxAge: 10 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);
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



require('./routes/authRoutes')(app);
require('./routes/users')(app);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT);

const PORT = process.env.PORT || 5000;
app.listen(PORT)
