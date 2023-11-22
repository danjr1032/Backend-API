const express = require("express");
const { createMessage, getAllMessages } = require("../controller/contact.controller");

const contactRoute = express.Router();

contactRoute.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.send({ message: 'All messages', messages });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching messages' });
  }
});

// contactRoute.post("/contact", async (req, res) => {
//   const { name, email, message } = req.body;
  
//   try {
//     const result = await createMessage(name, email, message);

//     if (result.success) {
//       res.send(result);
//     } else {
//       res.status(500).send(result);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   }
// });

contactRoute.post('/contact', createMessage);

module.exports = contactRoute;
