const routes = require('express').Router();
const questionsRouter = require('./questions');
const articlesRouter = require('./articles-routes');
const profileRouter = require('./profile');

routes.use('/articles', articlesRouter);
routes.use('/questions', questionsRouter);
routes.use('/profile', profileRouter);

module.exports = routes;