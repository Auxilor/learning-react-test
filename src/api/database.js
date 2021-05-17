const mongoose = require('mongoose');

const database = mongoose.connect('mongodb+srv://admin:admin@dev.sftai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = database;
