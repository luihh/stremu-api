import express from 'express';
import { Song } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', async (_, res: Response) => {
  const songs = await Song.findAll();
  res.json(songs);
});

router.get('/:id', async (req: Request, res: Response) => {
  const song = await Song.findByPk(req.params.id);
  if (!song) return res.status(404).json({ error: 'Song not found' });
  res.json(song);
});

export default router;
