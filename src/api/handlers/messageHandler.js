const database = require('../database');
const Message = require('../Message');
const handlerLoader = require('./handlers');

database.then(() => {
  process.stdout.write('Loaded!\n');
});

const handlers = [];

const getMessages = async () => Message.find();

const registerHandler = function(handler) {
  handlers.push(Object.create(handler));
}

const handleMessage = (message) => {
  let executed = false;

  handlers.forEach((handler) => {
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
  registerHandler,
  handleMessage,
  sendMessage,
};

handlerLoader.load();
