import axios from 'axios'

const api = axios.create({
})


export const getApi = () => {
  return api.get('/api/portfolio')
}