exports.auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error('No token provided');
    error.statusCode = 401;
    throw error;
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;
  next();
};