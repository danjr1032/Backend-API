
const User = require('../models/User'); 
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => {
  const {fullName, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      fullName,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    alert("SignUp successfully!");
    location.href="https://trashpoint.vercel.app/services.html";
    // res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Could not create user', error: error.message });
  }
};

const hashPassword = async (password) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};



const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcryptjs.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};

exports.login = async (req, res) => {
    const { phone, password } = req.body;
    
  
    try {
      const user = await User.findOne({ phone });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = user.save(password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};



exports.getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.body; 
    const user = await User.findOne({ phone });

    if (user) {
      res.send("User found successfully!");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
