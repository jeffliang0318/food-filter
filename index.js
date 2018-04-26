const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
//need to load User before passport otherwise Schema couldnt been found
require('./services/passport');

const app = express();

app.use(bodyParser.json());
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

require('./routes/authRoutes')(app);
require('./routes/users')(app);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
