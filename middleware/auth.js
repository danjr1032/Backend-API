const express = require('express');
const passport = require('passport');
const {google} = require ('googleapis')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const authRouter = express.Router();
const CLIENT_ID = "160039151190-5opijv1tlg60ibc0l9tq327s5ebfjm9b.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "http://localhost:5500/auth/google/callback", 
  passReqToCallback: true,
  scope: ["profile"]
}, async (accessToken, refreshToken, profile, done) => {
  // const user = {
  //   fullName: profile.displayName,
  //   phoneNumber: profile.phoneNumber || null,
  // };  
  console.log('PROFILE',profile);
  // return done(null, user);
}));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    const user = getUserById(id);
    done(null, user);
  });
  
  authRouter.get('/auth/google',
    passport.authenticate('google', { scope: ["email"]})
  );
  
  authRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // res.redirect("https://trashpoint.vercel.app/Dashboard");
    }
  );
  

module.exports = authRouter;
