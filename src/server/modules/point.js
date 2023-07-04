
import api from '../index.js'

export const getPoint = (params) => {
  return api.post('/getPoint', params)
}