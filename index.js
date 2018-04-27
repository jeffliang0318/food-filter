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

if (process.env.NODE.ENV === 'production'){
  // Express will serve up production assets
  // like main.js or main.css file
  app.use(express.static('client/build'));
  // Express will serve up the index.html file
  // if ti doesn't reconized the route
  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
