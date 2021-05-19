const handler = require('../handlers/handler');
const server = require('../server');

server.get('/api/v1/users', async (req, res) => {
  handler.getUsers()
    .then((users) => {
      res.json({
        users: JSON.reParse(users)
          .map(({
            _id,
            __v,
            ip,
            ...rest
          }) => rest),
      });
    })
    .catch((err) => {
      res.status(500);
      throw err;
    });
});

server.post('/api/v1/users', async (req, res) => {
  const ip = req.ip.substring(req.ip.lastIndexOf(':') + 1);

  await handler.addUser(req.body.name, ip);

  res.json({
    message: 'Success',
  });
});
