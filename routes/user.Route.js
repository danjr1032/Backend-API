const express = require ('express');
const {createUser, getUserByPhone, login} = require ('../controller/user.Controller');
const {User} = require ("../models/User")
const userRoute = express.Router();

userRoute.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ message: 'All users', users });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching users' });
  }
});



userRoute.post('/signup', createUser);
userRoute.get('/:phone', getUserByPhone)
userRoute.post("/login", login)
userRoute.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging out');
    } else {
      res.send('Logged out successfully');
    }
  });
});

module.exports = userRoute;
