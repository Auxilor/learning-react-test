const handler = require('../handlers/handler');
const server = require('../server');

server.get('/api/v1/messages', async (req, res) => {
  handler.getMessages()
    .then((messages) => {
      res.json({
        messages: JSON.parse(JSON.stringify(messages))
          .map((obj) => JSON.parse(JSON.stringify({
            message: obj.message,
            sender: obj.sender,
          }))),
      });
    })
    .catch((err) => {
      res.status(500);
      throw err;
    });
});

server.post('/api/v1/messages', async (req, res) => {
  req.body.message = req.body.message.trim();
  if (req.body.message === '') {
    res.status(400);
    res.json({
      message: 'Invalid Message',
    });
    return;
  }

  if (!handler.handleMessage(req.body.message)) {
    await handler.sendMessage(req.body.message, req.ip.substring(req.ip.lastIndexOf(':') + 1));
  }

  res.json({
    message: 'Success',
  });
});
