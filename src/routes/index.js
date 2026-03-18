const express = require('express');

const router = express.Router();

router.route('/login').post(authController.login);

module.exports = router;
