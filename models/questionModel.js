const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email field is required and can not be empty.']
  },
  name: {
    type: String
  },
  question: {
    type: String,
    required: true
  },
  time: {
    type: Date
  }
});

const Question = mongoose.model('question', questionSchema, 'questions');

module.exports = Question;