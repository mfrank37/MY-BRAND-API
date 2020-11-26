const authRoutes = require('express').Router();
const { login } = require('../controllers/authenticator');

authRoutes.post('/login', login);

module.exports = authRoutes;