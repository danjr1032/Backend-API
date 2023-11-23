const express = require ("express");
const { createMessage, getAllMessages } = require("../controller/contact.controller");

const Router = express.Router();

Router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.send({ message: 'All messages', messages });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching messages' });
  }
  getAllMessages
});


Router.post('/send', createMessage);

module.exports = Router;
