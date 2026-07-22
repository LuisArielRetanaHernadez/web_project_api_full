const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET } = process.env;


exports.auth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    const error = new Error('No token provided');
    error.statusCode = 401;
    throw error;
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded) {
    error.statusCode = 403
    const error = new Error('Not Authorization')
    throw error
  }

  req.user = decoded
  return next()
};