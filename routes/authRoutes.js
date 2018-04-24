const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // redirect to index after google auth
      res.redirect('/')
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
    console.log(req);
  });

  app.post('/api/current_user', async (req, res) => {
    console.log(req);
    console.log(res);
    const { ingredient } = req.body;

    req.user.allergyIngredient = ingredient;
    const user = await req.user.save();

    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    // redirect to index after logout
    res.redirect('/');
  });
};
