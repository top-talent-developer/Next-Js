// const proxy = require('http-proxy-middleware');



const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/api', '/mystoreauth', '/lookup'],
    createProxyMiddleware({
      target: 'https://rapo-api-614827f6f9e3923378036fc3-dlsrp37ffa-uc.a.run.app',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api2': '/api', // rewrite path
      // },
    })
  );
  app.use(
    ['/admin/api'],
    createProxyMiddleware({
      target: 'https://rapoadmin.rapo.store',
      changeOrigin: true,
      pathRewrite: {
        '^/admin/api': '/api', // rewrite path
      },
    })
  );
};

// module.exports = function(app) {
//   app.use(proxy('/api', { target: 'http://localhost:3001/' }))
//   app.use(proxy('/adminapi', { target: 'http://localhost:8080/' }))
//   app.use(proxy('/mystoreauth', { target: 'http://localhost:3001/' }))
//   app.use(proxy('/lookup', { target: 'http://localhost:3001/' }))
// }