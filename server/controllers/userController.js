const db = require('../models/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};

// getUsers: makes a query for all users in DB and returns data

userController.getUsers = (req, res, next) => {
  try {
    const getUsers = 'SELECT * from users';
    db.query(getUsers).then((users) => {
      // console.log(users.rows);
      res.locals.users = users.rows;
      return next();
    });
  } catch (error) {
    return next(error);
  }
};

// addUser: obtains username/password from req.body and uses values to create a search query
// SQL query for username. if it exists, notify the user
// else, add user's login to DB


userController.addUser = (req, res, next) => {
  try {
    const { username, password } = req.body;
    const values = [username, password];
    const check = `SELECT * FROM users WHERE username = $1`;

    db.query(check, [username]).then((result) => {
      if (result.rows.length > 0) {
        return res.status(409).json({ error: 'Username already exists', status: 409 });
      }
      const insertUser = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;
      db.query(insertUser, values).then((user) => {
        const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
        });
        res.locals.token = { username, accessToken };
        // console.log(res.locals.token);
        return next();
      });
    });
  } catch (error) {
    // Handle any potential errors
    next(error);
  }
};

module.exports = userController;
