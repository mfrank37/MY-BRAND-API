const updateArticle = (req, res) => {
    let found = true;
    if (found) {
      res.status(200);
      res.json({
        code: 'update',
        message: 'updating succeeded for the article',
        articleID: 'viziyo-twenti-twenti',
        article: req.body
      });
      res.send();
    } else {
      res.status(404);
      res.json({
        code: 'not-found',
        message: `Server can not find requested article : ${req.url}`
      });
      res.send();
    }
  }

module.exports = updateArticle;