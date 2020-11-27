const router = require('express').Router();
const { authenticateJWT } = require('../controllers/authenticator');
const {
  sendQuestion,
  getQuestions
} = require('../controllers/questions');

router.post('/', sendQuestion);
router.use('/', authenticateJWT);
router.get('/', getQuestions);

module.exports = router;