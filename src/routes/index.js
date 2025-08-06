const express = require('express');
const router = express.Router();

const streamRoutes = require('./stream');

router.use('/stream', streamRoutes);

module.exports = router;
