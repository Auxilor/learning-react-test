const handlers = [];

const registerHandler = (handler) => {
  handlers.push(Object.create(handler));
};

module.exports = {
  registerHandler,
  handlers,
};
