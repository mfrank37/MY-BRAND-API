const routes = require('express').Router();
const questionsRouter = require('./questions');
// const profile = require('./profile');
const articlesRouter = require('./articles-routes');

routes.use('/articles', articlesRouter);
routes.use('/questions', questionsRouter);

module.exports = routes;