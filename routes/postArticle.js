const Article = require('../models/articleModel.js');
const postArticle = require('express').Router();

postArticle.post('/', (req, res) => {
  Article.create(req.body)
    .then((article) => {
      res.status(200);
      res.json({
        code: 'post-success',
        message: 'posting article successfully',
        articleID: article._id,
        article: article
      });
      res.send();
    })
    .catch(err => {
      console.log(err);
      res.status(404);
      res.json({
        code: 'post-failure',
        message: `Can not post the article. Please use valid data`
      });
      res.send();
    });
});

module.exports = postArticle;