const router = require('express').Router();
const {
  sendQuestion,
  getQuestions
} = require('../controllers/questions');

router.get('/', getQuestions);
router.post('/', sendQuestion);

module.exports = router;