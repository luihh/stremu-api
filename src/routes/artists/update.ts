import express from 'express';
import { Artist } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.put('/:id', async (req: Request, res: Response) => {
  const artist = await Artist.findByPk(req.params.id);
  if (!artist) return res.status(404).json({ error: 'Artist not found' });

  await artist.update(req.body);
  res.json(artist);
});

export default router;
