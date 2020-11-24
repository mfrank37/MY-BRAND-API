const Article = require('../../models/articleModel');

const updateArticle = (req, res) => {
  Article.findOne({
      _id: req.url.slice(1)
    })
    .then(ARTICLE => {
      ARTICLE.title = req.body.title;
      ARTICLE.description = [...req.body.description];
      ARTICLE.coverImageURL = req.body.coverImageURL;
      ARTICLE.updated = new Date();
      ARTICLE.save()
        .then(UPDATED => {
          res.status(200).json({
            code: 'updated',
            message: 'the article was updated successfully',
            article: UPDATED
          });
          res.send();
        })
        .catch(err => {
          res.status(500).send({
            code: 'not-updated',
            message: 'Unexpected error caught while updating article. Article may have been deleted.',
            mongoError: err
          })
        });
    })
    .catch(err => {
      res.status(400).send({
        code: 'bad-request',
        message: 'Bad request. Please ensure the article\'s fields and id in url are all valid',
        mongoError: err
      });
    });
}

module.exports = updateArticle;