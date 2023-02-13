const express = require('express');
const menuController = require('./menuController');
const authentController = require('./authentController');

const router = express.Router();
router.route('/').get(authentController.protect, menuController.getAllMenu).post(menuController.addToMenu);
router.route('/:id').patch(menuController.updateMenu).get(menuController.getOneMenu);

module.exports = router;
