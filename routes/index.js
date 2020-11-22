const routes = require('express').Router();

// CREATE
const postArticle = require('./postArticle');
routes.use('/', postArticle);
// READ ALL
const allArticles = require('./allArticles');
routes.use('/', allArticles);
// READ ONE
const article = require('./article');
routes.use('/', article);
// UPDATE
const updateArticle = require('./updateArticle');
routes.use('/', updateArticle);
// DELETE
const deleteArticle = require('./deleteArticle');
routes.use('/', deleteArticle);

// default paths | invalid ones | unfound | bad requests
routes.use('/', (req, res) => {
  res.status(400).send({
    message: "Not found | Invalid | bad requests"
  });
})

module.exports = routes;