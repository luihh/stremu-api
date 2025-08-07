const express = require('express');
const { Artist } = require('../../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const artists = await Artist.findAll();
  res.json(artists);
});

router.get('/:id', async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);
  if (!artist) return res.status(404).json({ error: 'Artist not found' });
  res.json(artist);
});

module.exports = router;
