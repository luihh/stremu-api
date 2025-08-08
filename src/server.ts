import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.js';
import { db } from './models/index.js';

const app = express();

app.use(express.json()).use(morgan('dev')).use(cors());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app
  .listen(PORT, async () => {
    console.log(`API running on port ${PORT}`);
  })
  .on('error', (error: any) => {
    throw new Error(error.message);
  });

db.sync().then(() => {
  console.log('Database connected and synced succesfully');
});
