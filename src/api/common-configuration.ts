import axios from 'axios'

// Common configuration for axios instance
export default axios.create({
  baseURL: 'https://api.prod.roommate.host/api/v1',
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
