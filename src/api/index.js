import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://guopw-api.club',
  // 解决跨域问题
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

export const getApi = () => {
  return api.get('/portfolio')
}