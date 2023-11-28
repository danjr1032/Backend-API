const userSessionMiddleware = (req, res, next) => {
    const user = req.user;
  
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    req.session.user = {
      id: user.id,
      phone: user.phone,
    };
  
    req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error saving session' });
      }
  
      next();
    });
  };
  
  module.exports = userSessionMiddleware;
  