import express from 'express';
import { ZodError } from 'zod';
import { Album } from '../../models/index.js';
import { albumSchema } from '../../schemas/album.js';

import type { AlbumInput } from '../../schemas/album.js';
import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.post('/', async (req: Request<{}, {}, AlbumInput>, res: Response) => {
  try {
    const data = albumSchema.parse(req.body);
    const album = await Album.create(data);
    res.status(201).json(album);
  } catch (err: any) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: err });
    }

    return res.status(500).json({ error: err });
  }
});

export default router;
