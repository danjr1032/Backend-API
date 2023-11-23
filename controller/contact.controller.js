
// const validateMessage = require ("../middleware/validatemessage");
const Message = require('../models/contact');

exports.createMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newMessage = new Message({ name, email, message });

    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message saved successfully' });
    res.redirect("https://trashpoint.vercel.app/index.html");
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error saving message' });
  }
};

// exports.createMessage = async (req, res) => {
//     const { name, email, message } = req.body;
    
//     try {
//       const sendMessage = new Message({ name, email, message });
//       await sendMessage.save();
  
//       res.redirect("https://trashpoint.vercel.app/index.html");c

//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, error: 'Error sending message' });
//     }
//   };
  
  

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error});
  }
};

 