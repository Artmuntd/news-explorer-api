const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/auth_err');
const { tokenNotFoundMessage, unauthorizedMessage } = require('../message');

const getAuth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  try {
    if (!token) {
      throw new AuthError(tokenNotFoundMessage);
    }

    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    next();
  } catch (err) {
    throw new AuthError(unauthorizedMessage);
  }
};

module.exports = {
  getAuth,
};
