const article = require('express').Router();

article.get('/:id', (req, res) => {
  let found = false;
  const article = {};
  if (found) {
    res.send(article);
  }
  // get articles if not continue below
  res.status(404);
  res.json({
    code: 'not-found',
    message: `Server can not find requested article : ${req.url}`
  });
  res.send();
});

module.exports = article;