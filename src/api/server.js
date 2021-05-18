const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())
  .use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  process.stdout.write(`Server listening on ${PORT}\n`);
});

module.exports = app;

require('./v1/index');
