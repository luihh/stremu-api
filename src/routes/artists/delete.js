const express = require('express');
const { Artist } = require('../../models');

const router = express.Router();

router.delete('/:id', async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);
  if (!artist) return res.status(404).json({ error: 'Artist not found' });

  await artist.destroy();
  res.status(204).end();
});

module.exports = router;
