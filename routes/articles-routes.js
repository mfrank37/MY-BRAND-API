const router = require('express').Router();
const {
    getAllArticles,
    getArticle,
    postArticle,
    deleteArticle,
    updateArticle
} = require('../controllers/articles');
const { authenticateJWT } = require('../controllers/authenticator');

router.get('/:id', getArticle);
router.get('/', getAllArticles);
router.use('/', authenticateJWT);
router.post('/', postArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;