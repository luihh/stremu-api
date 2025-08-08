import express, { Router } from 'express';

import create from './create.js';
import read from './read.js';
import update from './update.js';
import deleteRoute from './delete.js';
import byArtist from './byArtist.js';

const router: Router = express.Router();

router.use('/', create);
router.use('/', read);
router.use('/', update);
router.use('/', deleteRoute);
router.use('/', byArtist);

export default router;
