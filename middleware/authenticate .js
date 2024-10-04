const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authenticate = async (req, res, next) => {
  try {
    // Get token from cookies or the Authorization header
    const token = req.cookies['recipe'] || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization denied, no token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user using the userId in the token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

exports.IsUser = (req, res, next) => {
    // Check if req.user exists and has the role 'user'
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized, no user found" });
    }
  
    // Check if the user has the role "user"
    if (req.user.role_id === "user") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "You are not authorized to access this resource" });
    }
  };
  

  