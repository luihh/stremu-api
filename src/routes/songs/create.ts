import express from 'express';
import { ZodError } from 'zod';
import { Song } from '../../models/index.js';
import { songSchema } from '../../schemas/song.js';

import type { SongInput } from '../../schemas/song.js';
import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.post('/', async (req: Request<{}, {}, SongInput>, res: Response) => {
  try {
    const data = songSchema.parse(req.body);
    const song = await Song.create(data);
    res.status(201).json(song);
  } catch (err: any) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: err });
    }

    return res.status(500).json({ error: err });
  }
});

export default router;
