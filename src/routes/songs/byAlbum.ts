import express from 'express';
import { Song } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/album/:albumId', async (req: Request, res: Response) => {
  try {
    const { albumId } = req.params;
    const songs = await Song.findAll({ where: { albumId } });
    if (!songs) return res.status(404).json({ error: 'Songs not found' });
    return res.json(songs);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

export default router;
