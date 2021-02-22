const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/auth_err');
const { tokenNotFoundMessage, unauthorizedMessage } = require('../message');

const handleAuthError = () => {
  throw new AuthError(unauthorizedMessage);
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

const getAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();

};

// const getAuth = (req, res, next) => {
//   //const { jwt: token } = req.cookies;

//   const { authorization } = req.headers;

//   try {
//     if (!token) {
//       throw new AuthError(tokenNotFoundMessage);
//     }

//     req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
//     next();
//   } catch (err) {
//     throw new AuthError(unauthorizedMessage);
//   }
// };

module.exports = {
  getAuth,
};
