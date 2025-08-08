import express, { Router } from 'express';
import { Artist } from '../../models/index.js';

const router: Router = express.Router();

router.put('/:id', async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);
  if (!artist) return res.status(404).json({ error: 'Artist not found' });

  await artist.update(req.body);
  res.json(artist);
});

export default router;
