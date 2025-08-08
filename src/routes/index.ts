import express, { Router } from 'express';
const router: Router = express.Router();

import artists from './artists/index.js';
import stream from './stream/index.js';

router.use('/artists', artists);
router.use('/stream', stream);

export default router;
