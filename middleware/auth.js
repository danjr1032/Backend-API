// auth.js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const authRouter = express.Router();
const CLIENT_ID = "160039151190-c19gfg1l08n95359jgatdlgu3ic6uja1.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "https://trashpoint.vercel.app/auth/google/callback", 
  passReqToCallback: true
}, (accessToken, refreshToken, profile, done) => {
  const user = {
    fullName: profile.displayName,
    phoneNumber: profile.phoneNumber || null,
  };  
  return done(null, user);
}));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    const user = getUserById(id);
    done(null, user);
  });
  
  authRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );
  
  authRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect("https://trashpoint.vercel.app/Dashboard");
    }
  );
  

module.exports = authRouter;
