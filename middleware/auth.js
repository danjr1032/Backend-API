const express = require('express');
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config()

const authRouter = express.Router();


passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "https://trashpoint.onrender.com/auth/google/callback", 
  // callbackURL: "http://localhost:5500/auth/google/callback", 
  passReqToCallback: true,
}, function(request, accessToken, refreshToken, profile, done) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));
  
passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});
  
authRouter.get('/auth/google',
passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }
));

authRouter.get( '/auth/google/callback',
  passport.authenticate( 'google', {
      successRedirect: '/auth/google/success',
      failureRedirect: '/auth/google/failure'
}));
  

module.exports = authRouter;
