const routes = require('express').Router();
const articles = require('./articles');
const questions = require('./questions');

routes.use('/articles', articles);
routes.use('/questions', questions);

module.exports = routes;