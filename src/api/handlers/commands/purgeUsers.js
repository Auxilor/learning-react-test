const User = require('../../mongo/schema/UserSchema');

module.exports = {
  name: 'purge users',
  execute: async () => {
    User.deleteMany({}, () => {
    });
  },
};
