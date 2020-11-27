const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/profile');

router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;