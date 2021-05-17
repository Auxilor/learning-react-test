const messageHandler = require('./messageHandler');
const Message = require('../Message');

const load = () => {
  messageHandler.registerHandler({
    name: 'yeet everything',
    execute: async () => {
      Message.deleteMany({}, () => {
      });
    },
  });
};

module.exports = {
  load,
}
