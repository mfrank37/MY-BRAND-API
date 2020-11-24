const routes = require('express').Router();
// const questions = require('./questions');
// const profile = require('./profile');
const articlesRouter = require('./articles-routes');

routes.use('/articles', articlesRouter);
// routes.use('/questions', questions);

module.exports = routes;