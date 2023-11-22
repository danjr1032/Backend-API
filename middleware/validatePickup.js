
const validatePickupRequest = (req, res, next) => {
    const { pickupLocation, date, time } = req.body;
  
    // Validate that required fields are present
    if (!pickupLocation || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields for pickup request' });
    }
    if (!user) {
        return res.status(400).json({message: "You must Signin first"})
    }
  
    // If all validation checks pass, proceed to the next middleware or route handler
    next();
  };
  
  module.exports = validatePickupRequest;