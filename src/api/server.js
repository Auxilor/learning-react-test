const express = require('express');
const handler = require('./handlers/handler');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())
  .use(express.urlencoded({ extended: true }));

app.get('/messages', async (req, res) => {
  handler.getMessages()
    .then((messages) => {
      res.json({
        messages,
      });
    });
});

app.post('/messages', async (req, res) => {
  if (!handler.handleMessage(req.body.message)) {
    await handler.sendMessage(req.body.message);
  }

  handler.getMessages()
    .then((messages) => {
      res.json({
        messages,
      });
    });
});

app.listen(PORT, () => {
  process.stdout.write(`Server listening on ${PORT}\n`);
});
