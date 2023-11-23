const mongoose = require ("mongoose");
const schema = mongoose.Schema;

const messageSchema = new schema({
   name: {
    type: String,
  },

  email: {
    type: String,
    require: true,
  },

  message: {
    type: String,
  }

});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;


