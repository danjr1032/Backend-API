const express = require('express');
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const authRouter = express.Router();
const CLIENT_ID = "160039151190-c19gfg1l08n95359jgatdlgu3ic6uja1.apps.googleusercontent.com ";
const CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  // callbackURL: "https://trashpoint.onrender.com/auth/google/callback", 
  callbackURL: "http://localhost:5500/auth/google/callback", 
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
