
import api from '../index.js'

export const getHtml = (params) => {
  return api.post('/getHtml', params)
}