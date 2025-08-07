const express = require('express');
const router = express.Router();

router.use('/artists', require('./artists'));
router.use('/stream', require('./stream'));

module.exports = router;
