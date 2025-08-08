import express from 'express';
import { Song } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });

    await song.update(req.body);
    return res.json(song);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

export default router;
