const handler = require('../handlers/handler');
const server = require('../server');

server.get('/api/v1/messages', async (req, res) => {
  handler.getMessages()
    .then((messages) => {
      res.json({
        messages: JSON.reParse(messages)
          .map(({ _id, __v, ...rest }) => rest),
      });
    })
    .catch((err) => {
      res.status(500);
      throw err;
    });
});

server.post('/api/v1/messages', async (req, res) => {
  const sender = req.ip.substring(req.ip.lastIndexOf(':') + 1);
  req.body.message = req.body.message.trim();

  if (req.body.message === '') {
    res.status(400);
    res.json({
      message: 'Invalid Message',
    });
    return;
  }

  if (!handler.handleMessage(req.body.message, sender)) {
    await handler.sendMessage(req.body.message, sender);
  }

  res.json({
    message: 'Success',
  });
});
