const express = require('express');
const { Artist } = require('../../models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
