
const Request = require('../models/Request');
const User = require ('../models/User');
const validateRequest = require ('../middleware/validateRequest');


exports.createRequest = async (req, res) => {
  const { requestType, location, date, time } = req.body;
  const userId = req.params.userId;

  try {
    const isoDate = new Date('2023-12-07T00:00:00.000Z');
    if (isNaN(isoDate.valueOf())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }
    const newRequest = new Request({ UserId: userId, requestType, location, date: isoDate, time });
    await newRequest.save();

    await User.findByIdAndUpdate(userId, { $push: { requests: newRequest._id } });

    res.status(201).json({ message: 'Request successful', Request: newRequest });
  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).json({ message: 'Error sending request', error: error.message });
  }
};

exports.getUserRequests = async (req, res) => {
  const userId = req.userId;
  try {
    const userRequests = await Request.find({ UserId: userId });

    res.json({ success: true, requests: userRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.send({ message: 'All requests', requests });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching requests' });
  }
};