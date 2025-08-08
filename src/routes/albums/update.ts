import express from 'express';
import { Album } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.put('/:id', async (req: Request, res: Response) => {
  const album = await Album.findByPk(req.params.id);
  if (!album) return res.status(404).json({ error: 'Album not found' });

  await album.update(req.body);
  res.json(album);
});

export default router;
