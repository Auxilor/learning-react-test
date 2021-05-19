const database = require('../database');
const Message = require('../Message');
const User = require('../User');
const commandRegistry = require('./commandRegistry');

database.then(() => {
  process.stdout.write('Loaded!\n');
});

const getMessages = async (filter) => Message.find(filter);

const getUsers = async (filter) => User.find(filter);

const addUser = async (name, ip) => {
  let id = Math.random().toString();
  id = id.substring(id.lastIndexOf('.') + 1);

  const user = new User({
    name,
    ip,
    id,
  });
  await user.save();
  return user.id;
};

const handleMessage = (message, sender) => {
  let executed = false;

  commandRegistry.handlers.forEach((handler) => {
    if (handler.name === message) {
      handler.execute(sender);
      executed = true;
    }
  });
  return executed;
};

const sendMessage = async (message, sender) => {
  await new Message({
    message,
    sender,
  }).save();
};

module.exports = {
  getMessages,
  handleMessage,
  sendMessage,
  getUsers,
  addUser,
};

require('./defaultCommands');
