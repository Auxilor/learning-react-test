const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())
  .use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.post('/api', (req, res) => {
  res.json({
    ...res.json,
    ...req.body,
  });
});

app.listen(PORT, () => {
  process.stdout.write(`Server listening on ${PORT}`);
});
