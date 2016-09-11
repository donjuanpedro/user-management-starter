const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const UserModel = require('../models/UserModel.js');
const UsersController = require('../controllers/UsersController.js');

/* GET users listing. */
router.get('/', UsersController.list);

router.get('/:id', UsersController.show);

router.post('/', UsersController.create);

router.put('/:id', UsersController.update);

router.delete('/:id', UsersController.remove);

module.exports = router;
