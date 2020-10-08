const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const LocalStrategy = require('passport-local');
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} = require('.');

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/security/google/redirect',
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {}
  )
);

passport.use(
  new FacebookStrategy(
    {
      callbackURL: '/security/facebook/redirect',
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {}
  )
);

passport.use(new LocalStrategy());
