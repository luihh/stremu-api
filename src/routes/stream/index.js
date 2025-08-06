const express = require('express');
const fs = require('node:fs');
const path = require('node:path');

const router = express.Router();

router.get('/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../../../songs', fileName);

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
});

module.exports = router;
