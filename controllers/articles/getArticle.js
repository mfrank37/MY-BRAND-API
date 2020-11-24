const Article = require('../../models/articleModel');

const getArticle = (req, res) => {
  Article.findById(req.url.slice(1))
    .then(ARTICLE => {
      if (!ARTICLE) {
        res.status(404).send({
          code: 'not-found',
          message: `Server can not find requested article : ${req.url}, It may have been deleted.`,
        });
      } else {
        res.status(200).send(ARTICLE)
      }
    })
    .catch(err => {
      res.status(400);
      res.json({
        code: 'bad-request',
        message: `Server can not process request which is invalid : ${req.url}`,
        mongoError: err
      });
      res.send();
    });
}

module.exports = getArticle;