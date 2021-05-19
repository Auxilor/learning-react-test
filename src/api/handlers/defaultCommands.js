const handlerRegistry = require('./commandRegistry');

handlerRegistry.registerHandler(require('./commands/yeetEverything'));
handlerRegistry.registerHandler(require('./commands/amogus'));
handlerRegistry.registerHandler(require('./commands/purgeUsers'));

module.exports = this;
