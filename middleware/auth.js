const express = require('express');
const passport = require('passport');
const {google} = require ('googleapis')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const authRouter = express.Router();
const CLIENT_ID = "160039151190-5opijv1tlg60ibc0l9tq327s5ebfjm9b.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "https://trashpoint.onrender.com/auth/google/callback", 
  passReqToCallback: true,
}, function(accessToken, refreshToken, profile, done) {
  userProfile=profile;
  return done(null, userProfile);
}
));
  
passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});
  
  authRouter.get('/auth/google',
    passport.authenticate('google', { scope : ['profile', 'email'] })
  );
  
  authRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/dashboard')}
  );
  

module.exports = authRouter;
