const Article = require('../../models/articleModel');

const postArticle = (req, res) => {
  Article.create(req.body)
    .then((article) => {
      res.status(200);
      res.json({
        code: 'post-success',
        message: 'posting article successfully',
        newArticle: article
      });
      res.send();
    })
    .catch(err => {
      res.status(403);
      res.json({
        code: 'post-failure',
        message: `Can not post the article. Please use valid data`,
        mongoError: err
      });
      res.send();
    });
}

module.exports = postArticle;