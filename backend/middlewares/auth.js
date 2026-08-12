const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../utils/managerErrors');

require('dotenv').config();

const { JWT_SECRET } = process.env;

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }
  

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      throw new ForbiddenError('Not Authorization');
    }

    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new ForbiddenError('Invalid token'));
    }
    return next(error);
  }
};