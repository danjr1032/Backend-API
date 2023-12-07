// const { UUID } = require("mongodb");
const { v4: uuidv4 } = require('uuid');
const mongoose = require ("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
  },

  fullName: {
    type: String,
    required: true
  },

  phone: {
    type: Number,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
  }],

});

const User = mongoose.model('User', userSchema);

module.exports = User;


