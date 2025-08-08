import express from 'express';
import { Song } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', async (_, res: Response) => {
  try {
    const songs = await Song.findAll();
    if (!songs) return res.status(404).json({ error: 'Songs not found' });
    return res.json(songs);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    return res.json(song);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

export default router;
