const Article = require('../../models/articleModel');

const getAllArticles = (req, res) => {
  Article.find({}).sort([
      ['published', 'ascending']
    ])
    .then(ARTICLES => {
      res.status(200).json(ARTICLES);
      res.send();
    }).catch(err => {
      res.status(500).json({
        code: "uncaught-error",
        message: err.message
      });
      res.send();
    })
}

module.exports = getAllArticles;