import express from 'express';
import { Artist } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });

    await artist.update(req.body);
    return res.json(artist);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

export default router;
