import express from 'express';
import { Song } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/artist/:artistId', async (req: Request, res: Response) => {
  try {
    const { artistId } = req.params;
    const songs = await Song.findAll({
      where: { artistId },
    });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
