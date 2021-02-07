require('dotenv').config();
require('./mongo');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const NotFoundError = require('./errors/not_found_err');
const errorHandler = require('./middlewares/error_handler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allRoutes = require('./routes/index_routes');
const { notFoundMessage } = require('./message');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use('/', allRoutes);
app.use(errorLogger);
app.use('*',() => {
  throw new NotFoundError(notFoundMessage);
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
