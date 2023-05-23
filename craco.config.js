// This config file fixes CRA path alias problem

const path = require('path')

module.exports = {
  webpack: {
    alias: {
      models: path.resolve(__dirname, 'src/models'),
      dto: path.resolve(__dirname, 'src/dto'),
      'api-services': path.resolve(__dirname, 'src/api/api-services'),
      'mapping-services': path.resolve(__dirname, './src/api/mapping-services')
    }
  }
}
