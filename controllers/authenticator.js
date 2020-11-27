const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const accessTokenSecret = process.env.accessTokenSecret;

const login = (req, res) => {
  User.findOne({
      username: req.body.username,
      password: req.body.password
    })
    .then(USER => {
      if (!USER) {
        res.status(403).send({
          code: "user-not-found",
          message: "user name or password is incorrect. Please try again."
        });
      } else {
        const accessToken = jwt.sign({
          username: USER.username,
          role: USER.role
        }, accessTokenSecret);
        res.status(200).json({
          accessToken
        });
        res.send();
      }
    })
    .catch(err => res.status(403).send({
      code: "login-fail",
      error: err
    }));
}

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessTokenSecret, (err, USER) => {
      if(!USER) {
        return res.status(403).send({
          code: 'forbidden',
          message: "you do not have access to this endpoints. Request your administrator for help if you are eligible."
        });
      }
      console.log("\x1b[33m !!! User accessing to secured endpoints : \x1b[0m");
      console.table(USER);
      if( (USER.role != 'admin') || err) {
        console.log("\x1b[31m !!!!!!!!!!!!! User rejected : !!!!!!!!!!!\x1b[0m");
        console.table(USER);
        return res.status(403).send({
          code: 'forbidden',
          message: "you do not have access to this endpoints. Request your administrator for help if you are eligible."
        });
      }
      req.USER = USER;
      next();
    });
  } else {
    res.status(403).send({
      code: 'forbidden',
      message: "you do not have access to this endpoints. Request your administrator for help if you are eligible."
    });
  }
}

module.exports = {
  login,
  authenticateJWT
}