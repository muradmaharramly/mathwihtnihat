const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      console.log('Auth Header Received:', req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];
      if (!process.env.JWT_SECRET) {
        console.error('CRITICAL: JWT_SECRET is missing in environment variables!');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      console.log('Received Token:', token ? 'Token present' : 'No token');
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.log('No Authorization header or token found');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
