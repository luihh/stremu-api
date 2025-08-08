import express from 'express';
import { Album } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', async (_, res: Response) => {
  try {
    const albums = await Album.findAll();
    if (!albums) return res.status(404).json({ error: 'Albums not found' });
    return res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    return res.json(album);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
