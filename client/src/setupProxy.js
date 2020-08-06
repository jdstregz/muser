const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function (app) {
  app.use(proxy('/auth/**', { target: 'http://localhost:8888' }));
  app.use(proxy('/api/**', { target: 'http://localhost:8888' }));
  app.use(proxy('/socket.io/**', { target: 'http://localhost:8888' }));
};
