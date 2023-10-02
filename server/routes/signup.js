const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passwordController = require('../controllers/passwordController');

router.post(
  '/',
  passwordController.hashPassword,
  userController.addUser,
  (req, res) => res.status(201).json(res.locals.token),
);

module.exports = router;
