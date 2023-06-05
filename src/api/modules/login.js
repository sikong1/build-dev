
import api from '../index.js'

export const getApi = () => {
  return api.get('/portfolio')
}
export const login = (params) => {
  return api.post('/login', params)
}