const express = require('express');
const User = require('../models/User');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


const authRouter = express.Router();



authRouter.use(session({
  secret: 'thisisaserioussecret',
  resave: false,
  saveUninitialized: false,
}));

authRouter.use(passport.initialize());
authRouter.use(passport.session());







passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:7000/auth/google/callback", 
// callbackURL: "https://trash-point.onrender.com/auth/google/callback", 

  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id });

    if (!user) {
      const newUser = new User({
        googleId: profile.id,
        password: uuidv4(), 
        phone: profile.phone || 9010009000,
        email: profile.email,
        fullName: profile.displayName || '', 
      });

      await newUser.save();
      return done(null, newUser);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});


authRouter.get('/auth/google',
passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }
));

authRouter.get( '/auth/google/callback',
  passport.authenticate( 'google', {
      successRedirect: 'https://trashpoint.vercel.app',
      // successRedirect: '/auth/google/success',
      failureRedirect: '/auth/google/failure'
}));
  

module.exports = authRouter;


// passport.use(new GoogleStrategy({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   // callbackURL: "https://trash-point.onrender.com/auth/google/callback", 
//   callbackURL: "http://localhost:7000/auth/google/callback", 
//   passReqToCallback: true,
// }, (req, accessToken, refreshToken, profile, done) => {
//   User.findOne({ googleId: profile.id }, (err, user) => {
//     if (err) {
//       return done(err);
//     }
//     if (!user) {
//       const newUser = new User({ googleId: profile.id});
//       newUser.save((saveErr) => {
//         if (saveErr) {
//           return done(saveErr);
//         }
//         return done(null, newUser);
//       });
//     } else {
//       return done(null, user);
//     }
//   })
// }
// ));
  
// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((userId, done) => {
//   User.findById(userId, (err, user) => {
//     done(err, user);
//   });
// });