const database = require('../database');
const Message = require('../Message');
const commandRegistry = require('./commandRegistry');

database.then(() => {
  process.stdout.write('Loaded!\n');
});

const getMessages = async () => Message.find();

const handleMessage = (message) => {
  let executed = false;

  commandRegistry.handlers.forEach((handler) => {
    if (handler.name === message) {
      handler.execute();
      executed = true;
    }
  });
  return executed;
};

const sendMessage = async (message) => {
  await new Message({
    message,
  }).save();
};

module.exports = {
  getMessages,
  handleMessage,
  sendMessage,
};

require('./defaultCommands');
