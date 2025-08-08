import express from 'express';
import { Album } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/artist/:artistId', async (req: Request, res: Response) => {
  try {
    const { artistId } = req.params;
    const albums = await Album.findAll({ where: { artistId } });
    if (!albums) return res.status(404).json({ error: 'Albums not found' });
    return res.json(albums);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

export default router;
