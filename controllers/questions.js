const Question = require('../models/questionModel');

const sendQuestion = (req, res) => {
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
}

const getQuestions = (req, res) => {
  Question.find({}).sort([
      ['time', 'descending']
    ])
    .then(QUERRIES => {
      res.status(200).json(QUERRIES);
      res.send();
    })
    .catch(err => {
      res.status(400).send({
        code: 'bad-request',
        message: `Can not get the request. Please use /api/questions to get querries`,
        mongoError: err
      });
    });
}

module.exports = {
  sendQuestion,
  getQuestions
}