import express from 'express';
import { Artist } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', async (_, res: Response) => {
  try {
    const artists = await Artist.findAll();
    if (!artists) return res.status(404).json({ error: 'Artists not found' });
    return res.json(artists);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    return res.json(artist);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

export default router;
