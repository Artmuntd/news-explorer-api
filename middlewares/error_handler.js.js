const { serverErrorMessage } = require('../message');

const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
  }

  if (statusCode === 500) {
    message = serverErrorMessage;
  }

  if (statusCode === 401) {
    res.clearCookie('jwt');
  }

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
