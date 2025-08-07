const express = require('express');

const create = require('./create');
const read = require('./read');
const update = require('./update');
const deleteRoute = require('./delete');

const router = express.Router();

router.use('/', create);
router.use('/', read);
router.use('/', update);
router.use('/', deleteRoute);

module.exports = router;
