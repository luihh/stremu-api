import express from 'express';
import fs from 'node:fs';
import { Song } from '../../models/index.js';

import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  const songId = Number(req.params.id);
  if (isNaN(songId)) return res.status(400).json({ error: 'Invalid song ID' });

  try {
    const song = await Song.findByPk(songId);
    if (!song)
      return res.status(404).json({ error: 'Song not found in database' });

    const { pathname: filePath } = new URL(
      `../../../songs/${songId}.mp3`,
      import.meta.url
    );

    fs.stat(filePath, (err, stats) => {
      if (err) {
        return res.status(404).send('File not found.');
      }

      const CHUNK_SIZE = 500 * 1e3; // 0.5MB

      const range = req.headers.range || '0';
      const start = Number(range.replace(/\D/g, ''));
      const end = Math.min(start + CHUNK_SIZE, stats.size - 1);
      const contentLength = end - start + 1;

      const headers = {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
      };

      res.writeHead(206, headers);
      const stream = fs.createReadStream(filePath, { start, end });
      stream.pipe(res);
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

export default router;
