const sendQuestion = require('express').Router();
const Question = require('../../models/questionModel');

sendQuestion.post('/', (req, res) => {
  req.body.time = new Date();
  Question.create(req.body)
    .then(QUERRY => {
      res.status(200).send({
        code: 'sent',
        message: 'Querry sent successfully!',
        querry: QUERRY
      });
    }).catch(err => {
      res.status(400).send({
        code: 'not-sent',
        message: 'querry not sent. invalid data or empty fields.',
        mongoError: err
      });
    });
})

module.exports = sendQuestion;