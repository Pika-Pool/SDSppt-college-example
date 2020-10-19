const router = require('express').Router();
const AuthController = require('../collections/auth.js');

router.post('/register', AuthController.user_registration_handler);
router.post('/login', AuthController.user_login_handler);

module.exports = router;
