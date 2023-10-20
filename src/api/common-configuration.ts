import axios from 'axios'

// Common configuration for axios instance
export default axios.create({
  baseURL: process.env.REACT_APP_HOST_TYPE === 'LOCAL'
    ? '/api/v1'
    : process.env.REACT_APP_HOST_TYPE === 'DEV'
      ? 'https://api.dev.roommate.host/api/v1'
      // For PROD
      : '',
  headers: {
    'Content-type': 'application/json'
    // 'Connection': 'keep-alive',
    // 'Accept-Encoding': 'gzip, deflate, br'
  },
  proxy: {
    protocol: 'http',
    host: '194.58.109.74',
    port: 80
  }
})
