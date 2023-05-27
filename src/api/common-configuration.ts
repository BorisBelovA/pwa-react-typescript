import axios from 'axios'
const envURI = {
  'DEV': 'http://localhost:3000',
  'PROD': 'http://194.58.109.74:8080'
}

const getBasURL = (): string => {
  const env: string | undefined = process.env.REACT_APP_HOST_TYPE
  if (env && (env === 'DEV' || env === 'PROD')) {
    return `${envURI[env]}/api/v1`
  }
  return `/api/v1`
}
// Common configuration for axios instance
export default axios.create({
  baseURL: getBasURL(),
  headers: {
    'Content-type': 'application/json',
    // 'Connection': 'keep-alive',
    // 'Accept-Encoding': 'gzip, deflate, br'
  },
  proxy: {
    protocol: 'http',
    host: '194.58.109.74',
    port: 8080
  }
})
