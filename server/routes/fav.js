const express = require('express');
const router = express.Router();
const favController = require('../controllers/favController');
const businessController = require('../controllers/businessController');

router.get('/', favController.getFavs, (req, res) => {
  res.json(res.locals.favs);
});

router.post('/', businessController.addBusiness, favController.addFav, (req, res) => {
  res.status(200).json(res.locals.fav);
});

router.delete('/', favController.removeFav, (req, res) => {
  res.json(res.locals.fav);
});

module.exports = router;
