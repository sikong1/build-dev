import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost'
})


export const getApi = () => {
  return api.get('/api')
}