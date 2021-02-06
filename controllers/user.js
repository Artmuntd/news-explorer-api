const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user_models');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not_found_err');
const UserExistError = require('../errors/user_exist_err');
const ErrRequest = require('../errors/err_request');
const { userNotFoundMessage } = require('../message');

const createUser = async (req, res, next) => {
  const { email, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return Promise.reject(new UserExistError('Данный пользователь уже зарегистрирован в базе'));
      }
      if (req.body.password === null || req.body.password.match(/^ *$/) !== null || req.body.password.length < 8) {
        return Promise.reject(new ErrRequest('Неверно задан пароль'));
      }

      return (bcrypt.hash(req.body.password, 10));
    })
    .then((password) => {
      const user = User.create({
        name, email, password,
      });

      return user;
    })
    .then(() => User.findOne({ email }))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 1000 * 60 * 60 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').end();
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundMessage);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = {
  createUser, login, getCurrentUser, logout,
};
