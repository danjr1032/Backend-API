const mongoose = require ("mongoose");
const schema = mongoose.Schema;

const pickupSchema = new schema({
  pickupLocation: {
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


const Pickup = mongoose.model('Pickup', pickupSchema);

module.exports = Pickup;