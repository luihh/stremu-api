const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { db } = require('./models');

const app = express();
const routes = require('./routes');

app.use(express.json()).use(morgan('dev')).use(cors());

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`API running on port ${PORT}`);
});

db.sync().then(() => {
  console.log('Database connected and synced succesfully');
});
