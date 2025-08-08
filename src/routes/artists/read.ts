import express from 'express';
import { Artist } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', async (_, res: Response) => {
  const artists = await Artist.findAll();
  res.json(artists);
});

router.get('/:id', async (req: Request, res: Response) => {
  const artist = await Artist.findByPk(req.params.id);
  if (!artist) return res.status(404).json({ error: 'Artist not found' });
  res.json(artist);
});

export default router;
