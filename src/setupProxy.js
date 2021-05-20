const createProxyMiddleware = require('http-proxy-middleware');
require('./api/server');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );
};
