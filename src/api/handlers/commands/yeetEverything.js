const Message = require('../../mongo/schema/MessageSchema');

module.exports = {
  name: 'yeet everything',
  execute: async () => {
    Message.deleteMany({}, () => {
    });
  },
};
