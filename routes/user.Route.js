const express = require('express');
const {createUser, getUserByPhone, login} = require ('../controller/user.Controller');

const userRoute = express.Router();

// Define your user routes here
userRoute.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send({ message: 'All users', users });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching users' });
  }
});

userRoute.post('/signup', createUser);
userRoute.get('/:phone', getUserByPhone)
userRoute.post("/login", login)

// You can define more routes as needed

module.exports = userRoute;
