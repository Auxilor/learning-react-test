const express = require('express');
const handler = require('./handlers/handler');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())
  .use(express.urlencoded({ extended: true }));

app.get('/api/messages', async (req, res) => {
  handler.getMessages()
    .then((messages) => {
      res.json({
        messages,
      });
    });
});

app.post('/api/messages', async (req, res) => {
  if (req.body.message === '') {
    res.status(400);
    res.json({
      message: 'Invalid Message',
    });
    return;
  }

  if (!handler.handleMessage(req.body.message)) {
    await handler.sendMessage(req.body.message);
  }

  res.json({
    message: 'Success',
  });
});

app.listen(PORT, () => {
  process.stdout.write(`Server listening on ${PORT}\n`);
});
