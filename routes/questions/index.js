const sendQuestion = require('./sendQuestion');
const routes = require('express').Router();

// POST
routes.use('/', sendQuestion);

module.exports = routes;