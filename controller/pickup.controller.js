
const Pickup = require('../models/Pickup');
const validatePickupRequest = require ('../middleware/validatePickup');



exports.requestPickup = async (req, res) => {
  const { pickupLocation, date, time } = req.body;

  try {
    // Assuming date is provided in the format "DD-MM-YYYY"
    const [day, month, year] = date.split('-');
    const isoDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

    const newPickup = new Pickup({ pickupLocation, date: isoDate, time });
    await newPickup.save();

    res.status(201).json({ message: 'Pickup request successful', pickup: newPickup });
  } catch (error) {
    console.error('Error requesting pickup:', error);
    res.status(500).json({ message: 'Error requesting pickup', error: error.message });
  }
};

exports.getAllPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find();
    res.send({ message: 'All requested pickups', pickups });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching requested pickups' });
  }
};
