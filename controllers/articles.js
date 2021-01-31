const Article = require('../models/article-model');

const getArticles = (req, res, next) => {
  const { _id: owner } = req.user;
  Article.find({ owner })
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { _id: owner } = req.user;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword: keyword.trim(),
    title: title.trim(),
    text: text.trim(),
    source: source.trim(),
    link: link.trim(),
    image: image.trim(),
    owner,
    date,
  })
    .then((article) => {
      res.status(201).send({ data: article });
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { _id: owner } = req.user;
  const { articleId } = req.params;

  Article.removeIfIsOwner(owner, articleId)
    .then((article) => {
      res.send({ data: article });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
