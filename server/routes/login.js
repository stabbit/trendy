const jwt = require('jsonwebtoken');
const express = require('express');
const db = require('../models/database.js');
const router = express.Router();
const bcrypt = require('bcrypt');

// extract passed in username and password from req.body
// queries and comparies user information
// if password is a match, provide user w/ access token
// else send, unauthorized response

router.post("/", (req, res, next) => {
  try {
    const { username, password } = req.body;
    const values = [username];
    const getUser = 'SELECT password FROM users WHERE username = $1';
    db.query(getUser, values)
      .then((user) => {
        bcrypt
          .compare(password, user.rows[0].password)
          .then((match) => {
            if (match) {
              const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET);
              res.cookie('accessToken', accessToken, {
                httpOnly: true,
              });
              res.json({ username, accessToken });
  
            } else {
              res.sendStatus(401);
            }
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
