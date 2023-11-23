
// const validateMessage = require ("../middleware/validatemessage");
const Message = require('../models/contact');

exports.createMessage = async (req, res) => {
  const {name, email, message } = req.body
  
  try {
    const newMessage = new Message({ 
      name:name, 
      email:email, 
      message:message
    });
    await newMessage.save();

    res.redirect("https://trashpoint.vercel.app/#");
    res.status(201).json({message: "Message sent successfully!"});

    // return { 
    //   // res.status(200),
    //   success: true, 
    //   message: 'Message sent successfully', 
    //   data: newMessage };
  } catch (error) {
    console.error(error);
    res.json(400)
    return { success: false, error: 'Error sending message' };
  }
};


exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error});
  }
};

