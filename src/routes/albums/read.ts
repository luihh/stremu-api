import express from 'express';
import { Album } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', async (_, res: Response) => {
  const albums = await Album.findAll();
  res.json(albums);
});

router.get('/:id', async (req: Request, res: Response) => {
  const album = await Album.findByPk(req.params.id);
  if (!album) return res.status(404).json({ error: 'Album not found' });
  res.json(album);
});

export default router;
