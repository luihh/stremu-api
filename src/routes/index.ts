import express, { Router } from 'express';
const router: Router = express.Router();

import albums from './albums/index.js';
import artists from './artists/index.js';
import songs from './songs/index.js';
import stream from './stream/index.js';

router.use('/albums', albums);
router.use('/artists', artists);
router.use('/songs', songs);
router.use('/stream', stream);

export default router;
