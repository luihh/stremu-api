import express from 'express';
import { ZodError } from 'zod';
import { Artist } from '../../models/index.js';
import { artistSchema } from '../../schemas/artist.js';

import type { ArtistInput } from '../../schemas/artist.js';
import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.post('/', async (req: Request<{}, {}, ArtistInput>, res: Response) => {
  try {
    const data = artistSchema.parse(req.body);
    const artist = await Artist.create(data);
    res.status(201).json(artist);
  } catch (err: any) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: err });
    }

    return res.status(500).json({ error: err });
  }
});

export default router;
