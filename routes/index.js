const routes = require('express').Router();
const questionsRouter = require('./questions');
const articlesRouter = require('./articles-routes');
const profileRouter = require('./profile');
const authRouter = require('./auth');

routes.use('/articles', articlesRouter);
routes.use('/questions', questionsRouter);
routes.use('/profile', profileRouter);
routes.use('/', authRouter);

module.exports = routes;