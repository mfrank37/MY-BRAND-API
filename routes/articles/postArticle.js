const article = require('./article');

const postArticle = require('express').Router();

postArticle.post('/', (req, res) => {
  let valid = true;
  if(valid) {
    res.status(200);
    res.json({
      code: 'post-success',
      message: 'posting article successfully',
      articleID: 'viziyo-twenti-taranti',
      article: req.body
    });
    res.send();
  } else {
    res.status(404);
    res.json({
    code: 'bad-post',
    message: `Can not post the article. Please use valid data`
  });
  res.send();
  }
});

module.exports = postArticle;