import express from 'express';
import multer from 'multer';
import fs from 'node:fs';
import { ZodError } from 'zod';
import { Song, db } from '../../models/index.js';
import { songSchema } from '../../schemas/song.js';

import type { SongInput } from '../../schemas/song.js';
import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

if (!fs.existsSync('temp')) {
  fs.mkdirSync('temp', { recursive: true });
}

const { pathname: songsDir } = new URL('../../../songs/', import.meta.url);
if (!fs.existsSync(songsDir)) {
  fs.mkdirSync(songsDir, { recursive: true });
}

const upload = multer({ dest: 'temp/' });

router.post(
  '/',
  upload.single('file'),
  async (req: Request<{}, {}, SongInput>, res: Response) => {
    const t = await db.transaction();

    try {
      if (!req.file) {
        await t.rollback();
        return res.status(400).json({ error: 'Audio file is required' });
      }

      const parsedData = songSchema.parse({
        title: req.body.title,
        artistId: Number(req.body.artistId),
        albumId: req.body.albumId ? Number(req.body.albumId) : undefined,
      });

      const song = await Song.create(parsedData, { transaction: t });

      const { pathname: finalPath } = new URL(
        `../../../songs/${song.id}.mp3`,
        import.meta.url
      );

      try {
        fs.renameSync(req.file.path, finalPath);
      } catch (fileErr) {
        await t.rollback();
        fs.unlinkSync(req.file.path);
        return res.status(500).json({ error: 'Failed to save audio file' });
      }

      await t.commit();
      return res.status(201).json(song);
    } catch (err: any) {
      await t.rollback();

      if (err instanceof ZodError) {
        return res.status(400).json({ error: err });
      }

      return res.status(500).json({ error: err });
    } finally {
      try {
        // clear temp folder
        const tempDir = 'temp';
        const files = fs.readdirSync(tempDir);
        for (const file of files) {
          fs.unlinkSync(`${tempDir}/${file}`);
        }
      } catch (tempErr) {
        console.error('Failed to clear temp folder.');
      }
    }
  }
);

export default router;
