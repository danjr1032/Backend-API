
const Message = require('../models/contact');

exports.createMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Message({ name, email, message });

    await newMessage.save();
    res.redirect("https://trashpoint.vercel.app/index.html");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error saving message' });
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

 