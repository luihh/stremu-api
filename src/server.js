const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const routes = require('./routes');

app.use(express.json()).use(morgan('dev')).use(cors());

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
