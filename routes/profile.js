const router = require('express').Router();
const { authenticateJWT } = require('../controllers/authenticator');
const { getProfile, updateProfile } = require('../controllers/profile');

router.use('/', authenticateJWT);
router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;