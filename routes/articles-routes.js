const router = require('express').Router();
const {
    getAllArticles,
    getArticle,
    postArticle,
    deleteArticle,
    updateArticle
} = require('../controllers/articles');

router.post('/', postArticle);
router.get('/:id', getArticle);
router.get('/', getAllArticles);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;