
import request from '../index.js'

export const getData = () => {
  return request({
    url: '/chat/getData',
    method: 'get',
  });
}