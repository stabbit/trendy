const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passwordController = {};

// hashPassword: hashs user's password using bcrypt

passwordController.hashPassword = (req, res, next) => {
  const { password } = req.body;
  bcrypt.hash(password, 10, (err, hashed) => {
    if (err) {
      return next(err);
    }
    req.body.password = hashed;
    return next();
  });
};

// authenticateToken: check req.body for authorization property
// if authorization property exists, extract the bearer token from response if it exists
// if token is null notify user that they do not have proper authentication credentials
// for resources else verify token and provide access if there are no errors

passwordController.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    return next();
  });
};

module.exports = passwordController;
