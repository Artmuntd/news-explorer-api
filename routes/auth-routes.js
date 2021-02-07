const router = require('express').Router();

const { signinValidator, signupValidator } = require('../validators/auth_validator');
const { login, createUser, logout } = require('../controllers/user');

router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);
router.post('/logout', logout);

module.exports = router;
