const router = require('express').Router();

const { createArticleValidator, deleteArticleValidator } = require('../validators/article_validator');
const { getAuth } = require('../middlewares/auth');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/articles', getAuth, getArticles);
router.post('/articles', getAuth, createArticleValidator, createArticle);
router.delete('/articles/:articleId', getAuth, deleteArticleValidator, deleteArticle);

module.exports = router;
