const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: 'http://194.58.109.74',
      changeOrigin: true
    })
  )
  // app.use(
  //   '/ws',
  //   createProxyMiddleware({
  //     target: 'ws://194.58.109.74',
  //     changeOrigin: true,
  //     ws: true
  //   })
  // )
}