
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
    res.redirect("https://trashpoint.vercel.app/dashboard.html");
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

  if (phone==="" && password==="") {
    res.send("message: All fields are required..")
  }else if (phone==="") {
    res.send("Please enter phone")
  }else if (password==="") {
    res.send("message: Please enter password")
  }

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user) {      
      const isPasswordValid = await comparePassword(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
      }      
      res.redirect("https://trashpoint.vercel.app/dashboard.html");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    aler
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



  // exports.login = async (req, res) => {
  //   const { phone, password } = req.body;
  
  //   if (!phone || !password) {
  //     return res.status(400).json({ message: 'All fields are required!' });
  //   }
  
  //   try {
  //     const user = await User.findOne({ phone });
  
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  
  //     const isPasswordValid = await comparePassword(password, user.password);
  
  //     if (!isPasswordValid) {
  //       return res.status(401).json({ message: 'Incorrect password' });
  //     }
  
  
  //     // Redirect after successful login
  //     res.redirect("https://trashpoint.vercel.app/services.html");
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // };