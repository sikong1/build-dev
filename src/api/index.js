import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})


export const getApi = () => {
  return api.get('/portfolio')
}