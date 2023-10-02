const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

router.get('/', businessController.allBusinesses, (req, res, next) => {
  res.json(res.locals.businesses);
});

router.post('/', businessController.addBusiness, (req, res, next) => {
  res.json(res.locals.business);
});

module.exports = router;
