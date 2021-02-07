const mongoose = require('mongoose');
const { default: validator } = require('validator');
const NotFoundError = require('../errors/not_found_err');
const ForbiddenError = require('../errors/prohibition_err');

const articleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, [{ allow_underscores: true }]),
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /(https?:\/\/(www)?)+.+/g.test(v),
    },
  },
  date: {
    type: String,
    required: true,
  },
});

articleSchema.statics.removeIfIsOwner = function (owner, articleId) {
  return this.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        return Promise.reject(new NotFoundError('Статья не найдена!'));
      }

      if (article.owner._id.toString() === owner) {
        return article.remove();
      }

      return Promise.reject(new ForbiddenError('Нет доступа!'));
    });
};

module.exports = mongoose.model('article', articleSchema);
