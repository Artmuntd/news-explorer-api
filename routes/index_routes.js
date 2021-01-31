const router = require('express').Router();

const authRoutes = require('./auth-routes');
const userRoutes = require('./user_routes');
const articleRoutes = require('./article_routes');

router.use(authRoutes);
router.use(userRoutes);
router.use(articleRoutes);

module.exports = router;
