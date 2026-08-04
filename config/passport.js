const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3000';

const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

function toSessionUser(provider, profile) {
  return {
    id: profile.id,
    provider: provider,
    displayName: profile.displayName,
    email: (profile.emails && profile.emails[0] && profile.emails[0].value) || null
  };
}

if (googleEnabled) {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/auth/google/callback`
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, toSessionUser('google', profile));
    }
  ));
}

module.exports = { passport, googleEnabled };
