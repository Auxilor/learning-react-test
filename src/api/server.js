const express = require('express');
const messageHandler = require('./handlers/messageHandler');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())
  .use(express.urlencoded({ extended: true }));

app.get('/messages', async (req, res) => {
  messageHandler.getMessages().then((messages) => {
    res.json({
      messages,
    });
  });
});

app.post('/messages', async (req, res) => {
  if (!messageHandler.handleMessage(req.body.message)) {
    await messageHandler.sendMessage(req.body.message);
  }

  messageHandler.getMessages().then((messages) => {
    res.json({
      messages,
    });
  });
});

app.listen(PORT, () => {
  process.stdout.write(`Server listening on ${PORT}\n`);
});
