const nodemailer = require('nodemailer');
const User = require('../models/User'); 
const Token = require ('../models/Token');
const sendEmail = require ('../utils/sendEmail');
const bcryptjs = require('bcryptjs');
const axios = require('axios');
const crypto = require('crypto');


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
    res.redirect('https://trashpoint.vercel.app/dashboardd.html');
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Could not create user', error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { fullname, email, address } = req.body;

  try {
    const user = await User.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.fullname = fullname;
    user.email = email;
    user.address = address;
    await user.save();
    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

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

  if (phone === '' || password === '') {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    req.session.user = {
      _id: user._id,
      phone: user.phone,
    };
    res.redirect('https://trashpoint.vercel.app/dashboardd.html');
    res.json({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.Reset = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send("User with the given email doesn't exist");
    }

    let token = await Token.findOne({ userId: user._id });

    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save();
    }

    const resetLink = `https://trashpoint.vercel.app/user/passwordReset/${user._id}/${token.token}`;

    await sendEmail(user.email, 'Password reset', resetLink);

    res.send('Password reset link sent to your email account');
  } catch (error) {
    res.status(500).send('An error occurred');
    console.error(error);
  }
};

exports.newPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("Invalid link or expired");

    const token = await Token.findOneAndDelete({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send("Invalid link or expired");

    // Hash the new password before saving it
    const newPassword = req.body.password;
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    
    user.password = hashedPassword;
    await user.save();
    res.redirect("/user/login");
    res.send("Password reset successfully.");
  } catch (error) {
    res.status(500).send("An error occurred");
    console.error(error);
  }
};







 