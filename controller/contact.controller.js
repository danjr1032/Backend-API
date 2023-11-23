
const Message = require ('../models/contact');


exports.createMessage = async (req, res) => {
  // const { name, email, message } = req.body;
  const name =req.body.name;
  const email =req.body.email;
  const nessage =req.body.message;

  try {
    if (name !== "" && email !== "" && message !== "") {
      const newMessage = new Message({ name, email, message });

      await newMessage.save();
      // res.json({ message: 'Message saved successfully'});
      res.redirect("https://trashpoint.vercel.app/index.html");
    } else {
      res.status(400).json({ error: 'Name, email, and message are required' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending message' });
  }
};


  exports.getAllMessages = async (req, res) => {
    try {
      const messages = await Message.find();
      res.status(200).json({ data: messages });
    } 
    catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };







// exports.getAllMessages = async (req, res) => {
//   try {
//     const messages = await Message.find();
//     res.json({ success: true, data: messages });
//   } catch (error) {
//     res.json({ success: false, error});
//   }
// };

 
// exports.createMessage = async (req, res) => {
//   const {name, email, message} = req.body;
//   try {

//     if (!name || !email || !message) {
//       res.status(400).json({ error: 'Please provide name, email, and message.' });
//     } else{
      
//       const newMessage = new Message({
//         name,
//         email,
//         message,
//       });
      
//       await newMessage.save();
//       res.redirect("https://trashpoint.vercel.app/index.html");
//       // res.status(201).json({ message: 'Message created successfully.', data: newMessage });

//     };

//   } catch (error) {
//     res.status(500).json({ message: 'Could not send message', error: error.message });
//   }
// };