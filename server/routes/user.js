const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers, (req, res, next) => {
  res.json(res.locals.users);
});

module.exports = router;
