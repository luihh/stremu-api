import express from 'express';
import { Album } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });

    await album.destroy();
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

export default router;
