const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/home', require('./home'));
router.use('/placement', require('./placement'));

module.exports = router;