const express = require('express');
const database = require('./database');
const Message = require('./Message');

database.then(() => {
  process.stdout.write('Loaded!\n');
});

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())
  .use(express.urlencoded({ extended: true }));

app.get('/messages', async (req, res) => {
  Message.find()
    .then((val) => {
      res.json({
        messages: val,
      });
    });
});

app.post('/messages', async (req, res) => {
  new Message({
    message: req.body.message,
  }).save()
    .then((r) => {
      res.json({
        messages: r,
      });
    });
});

app.listen(PORT, () => {
  process.stdout.write(`Server listening on ${PORT}\n`);
});
