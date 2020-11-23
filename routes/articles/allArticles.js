const allArticles = require('express').Router();

allArticles.get('/', (req, res) => {
  res.status(200).send([
    {title: 'title1', body:'body1'},
    {title: 'title2', body:'body2'}
  ]);
});

module.exports = allArticles;