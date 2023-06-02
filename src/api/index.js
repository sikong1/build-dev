import axios from 'axios'

const api = axios.create({
  baseURL: '/'
})


export const getApi = () => {
  return api.get('abuot')
}