const Article = require('../../models/articleModel');

const deleteArticle = (req, res) => {
  Article.findOne({
    _id: req.url.slice(1)
  }).then(ARTICLE => {
    ARTICLE.deleteOne()
      .then(() => {
        res.status(200).send({
          code: 'deleted',
          _id: req.url.slice(1),
          message: `The article was deleted successfully.`
        });
      }).catch((err) => {
        res.status(500).send({
          code: 'not-deleted',
          message: 'The article could not be deleted. Please try again.',
          mongoMessage: err.message
        });
      });
  }).catch(err => {
    res.status(404).send({
      code: 'not-found',
      message: `could not find the article : ${req.url}`,
      mongoError: err
    });
  });
}

module.exports = deleteArticle;