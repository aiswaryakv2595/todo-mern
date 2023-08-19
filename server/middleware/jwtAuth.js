const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const jwtAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.TOKEN); 

    const id = decodedToken.id;
    const username = decodedToken.username;
    

    
    const user = await User.findOne({ _id: id, username: username });

    if (!user) {
      throw new Error();
    }

    // Attach the admin details to the request object
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
     
      res.status(401).json({ message: 'Token expired', isTokenExpired: true });
    } else {
      res.status(401).json({ message: 'Unauthorized.' });
    }
  }
};

module.exports = {
    jwtAuth
};
