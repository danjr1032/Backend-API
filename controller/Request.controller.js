
const Request = require('../models/Request');



exports.createRequest = async (req, res) => {
  const { requestType,location, date, time } = req.body;
  // const UserId = req.user._id; 
  try {

    const isoDate = new Date(date);

    const newRequest = new Request({ requestType, location, date: isoDate, time });

    // const [day, month, year] = date.split('-');
    // const isoDate = new Date(`${day}-${month}-${year}T00:00:00.000Z`);
    // const newRequest = new Request({requestType, location, date: isoDate, time });
    
    await newRequest.save();

    res.status(201).json({ message: 'Request successful', Request: newRequest });
  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).json({ message: 'Error sending request', error: error.message });
  }
};




exports.getUserRequests = async (req, res) => {
  const UserId = req.user._id; 

  try {
    const userRequests = await Request.find({ UserId });

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
