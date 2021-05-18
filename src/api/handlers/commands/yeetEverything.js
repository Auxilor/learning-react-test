const Message = require('../../Message');

module.exports = {
  name: 'yeet everything',
  execute: async () => {
    Message.deleteMany({}, () => {
    });
  },
};
