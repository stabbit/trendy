const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

router.get(
  "/",
  searchController.getBuisnesses,
  searchController.getComments,
  searchController.getRatings,
  (req, res, next) => {
    res.json(res.locals.businesses);
  }
);

module.exports = router;
