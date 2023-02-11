const express = require('express');

const authController = require('./authentController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
//console.log('123')

module.exports = router;