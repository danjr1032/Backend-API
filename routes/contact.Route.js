const express = require("express");
const { createMessage, getAllMessages } = require("../controller/contact.controller");

const contactRoute = express.Router();

contactRoute.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.send({ message: 'All messages', messages });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching messages' });
  }
});


contactRoute.post('/contact', createMessage);

module.exports = contactRoute;
