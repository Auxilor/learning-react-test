const User = require('../../User');

module.exports = {
  name: 'purge users',
  execute: async () => {
    User.deleteMany({}, () => {
    });
  },
};
