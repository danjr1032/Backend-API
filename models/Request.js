const mongoose = require ("mongoose");
const schema = mongoose.Schema;

const requestSchema = new schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },

  requestType:{
    type: String,
    required: true
  },

  location: {
  type: String,
   required: true
  },

  date: {
    type: Date,
    required: true
  },

  time: {
    type: String,
    required: true
  },
  
});


const Request = mongoose.model('Request', requestSchema);

module.exports = Request;