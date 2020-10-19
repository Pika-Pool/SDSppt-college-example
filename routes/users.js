const router = require('express').Router();
const UsersConstroller = require('../collections/users.js');

router.get('/dashboard', UsersConstroller.user_dashboard_handler);

module.exports = router;
