const mongoose = require('mongoose');

const creds = process.env.MONGO_CREDS || 'admin:admin';

const database = mongoose.connect(`mongodb+srv://${creds}@dev.sftai.mongodb.net/messageDb?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = database;
