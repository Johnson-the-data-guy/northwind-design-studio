const express = require('express');
const { passport, googleEnabled } = require('../config/passport');

const router = express.Router();

function notConfigured(provider) {
  return function (req, res) {
    res.status(503).send(
      `${provider} login isn't configured yet. Set the ${provider.toUpperCase()}_* env vars (see .env.example) to enable it.`
    );
  };
}

if (googleEnabled) {
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
      res.redirect('/dashboard');
    }
  );
} else {
  router.get('/google', notConfigured('Google'));
  router.get('/google/callback', notConfigured('Google'));
}

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
