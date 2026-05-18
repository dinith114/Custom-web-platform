const jwt = require('jsonwebtoken');
const config = require('../../config');
const { errorResponse } = require('../../utils/responseHelper');

/**
 * Verify JWT token middleware
 * Extracts token from Authorization header, verifies it,
 * and attaches decoded user to req.user
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('Access denied. No token provided.'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // { id, email, role }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json(errorResponse('Token has expired. Please login again.'));
    }
    return res.status(401).json(errorResponse('Invalid token.'));
  }
};

/**
 * Generate JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
};

/**
 * Restrict to specific roles
 * Usage: authorizeRoles('admin')
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json(errorResponse('You do not have permission to perform this action.'));
    }
    next();
  };
};

module.exports = { verifyToken, generateToken, authorizeRoles };
