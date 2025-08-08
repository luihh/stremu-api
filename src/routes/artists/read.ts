import express, { Router } from 'express';
import { Artist } from '../../models/index.js';

const router: Router = express.Router();

router.get('/', async (_, res) => {
  const artists = await Artist.findAll();
  res.json(artists);
});

router.get('/:id', async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);
  if (!artist) return res.status(404).json({ error: 'Artist not found' });
  res.json(artist);
});

export default router;
