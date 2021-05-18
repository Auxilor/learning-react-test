const handlerRegistry = require('./commandRegistry');
const yeetEverything = require('./commands/yeetEverything');

const load = () => {
  handlerRegistry.registerHandler(yeetEverything);
};

module.exports = {
  load,
};
